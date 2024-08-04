import pandas as pd
from io import BytesIO
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, extract, func, and_
from sqlalchemy.orm import aliased
from DB.model import Staff, Time_set, Department
from datetime import datetime, timedelta
import openpyxl


async def generate_excel_file_day(db: AsyncSession, department_id: int, day: int, month: int, year: int):
    try:
        # Создание даты из переданных параметров
        date = datetime(year, month, day)
        
        # Получение названия отдела
        department_stmt = select(Department.name).where(Department.id == department_id)
        department_result = await db.execute(department_stmt)
        department_name = department_result.scalar_one_or_none()
        if not department_name:
            raise ValueError(f"Department with id {department_id} not found")

        # Получение данных сотрудников с данными за указанный день и департамент
        stmt = select(
            Staff.id,
            Staff.name,
            Staff.surname,
            Staff.bid,
            Time_set.time_in,
            Time_set.time_out,
            Time_set.date_set,
            Time_set.hours,
            Time_set.overtime,
            Time_set.comment
        ).outerjoin(Time_set, and_(Staff.id == Time_set.staff_id, Time_set.date_set == date.date())).where(
            Staff.department == department_id
        )
        
        result = await db.execute(stmt)
        records = result.fetchall()
        
        # Получение данных времени для каждого сотрудника
        data = []
        for record in records:
            data.append({
                "Имя": str(record.name),
                "Фамилия": str(record.surname),
                "Ставка": float(record.bid),
                "Название отдела": str(department_name),
                "Время прихода": record.time_in.strftime('%H:%M') if record.time_in else "-",
                "Время ухода": record.time_out.strftime('%H:%M') if record.time_out else "-",
                "День": record.date_set.strftime('%Y-%m-%d') if record.date_set else "-",
                "Часы": record.hours if record.hours is not None else "-",
                "Переработки": record.overtime if record.overtime is not None else "-",
                "Комментарий": record.comment if record.comment else "-"
            })

        # Создание DataFrame, включая заголовки, если данных нет
        columns = ["Имя", "Фамилия", "Ставка", "Название отдела", "Время прихода", "Время ухода", "День", "Часы", "Переработки", "Комментарий"]
        if not data:
            data.append({col: "" for col in columns})

        df = pd.DataFrame(data, columns=columns)
        
        # Сохранение в Excel
        output = BytesIO()  
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Staff Time Log')
            
            # Настройка ширины столбцов
            worksheet = writer.sheets['Staff Time Log']
            for column in worksheet.columns:
                max_length = 0
                column = [cell for cell in column]
                for cell in column:
                    try:
                        if len(str(cell.value)) > max_length:
                            max_length = len(cell.value)
                    except:
                        pass
                adjusted_width = (max_length + 5)
                worksheet.column_dimensions[column[0].column_letter].width = adjusted_width

                for cell in column:
                    cell.border = openpyxl.styles.Border(
                        left=openpyxl.styles.Side(style='thin'),
                        right=openpyxl.styles.Side(style='thin'),
                        top=openpyxl.styles.Side(style='thin'),
                        bottom=openpyxl.styles.Side(style='thin')
                    )   

        output.seek(0)

        # Имя файла без преобразований кодировок
        filename = f"daily report {date.strftime('%Y-%m-%d')}.xlsx"

        return StreamingResponse(
            output,
            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            headers={
                'Content-Disposition': f'attachment; filename="{filename}"; filename*=UTF-8\'\'{filename}'
            }
        )

    except Exception as e:
        print("Error generating Excel file:", e)
        raise


async def generate_excel_file_month(db: AsyncSession, department_id: int, year: int, month: int):
    try:
        # Создание подзапроса для суммирования часов и переработок по сотрудникам
        time_set_alias = aliased(Time_set)
        subquery = select(
            time_set_alias.staff_id,
            func.sum(time_set_alias.hours).label('total_hours'),
            func.sum(time_set_alias.overtime).label('total_overtime')
        ).where(
            and_(
                extract('year', time_set_alias.date_set) == year,
                extract('month', time_set_alias.date_set) == month
            )
        ).group_by(time_set_alias.staff_id).subquery()

        # Основной запрос с левым соединением и фильтрацией по department_id
        stmt = select(
            Staff.name,
            Staff.surname,
            Staff.bid,  
            func.coalesce(subquery.c.total_hours, 0).label('total_hours'),
            func.coalesce(subquery.c.total_overtime, 0).label('total_overtime'),
            Department.name.label("department_name")
        ).outerjoin(subquery, Staff.id == subquery.c.staff_id).where(
            Staff.department == department_id
        ).join(Department, Department.id == Staff.department)

        result = await db.execute(stmt)
        records = result.fetchall()

        # Подготовка данных для создания DataFrame
        data = []
        for record in records:
            data.append({
                "Имя": str(record.name),
                "Фамилия": str(record.surname),
                "Ставка": str(record.bid),
                "Всего часов": int(record.total_hours),
                "Всего переработок": int(record.total_overtime),
                "Название отдела": str(record.department_name)
            })

        # Создание DataFrame
        df = pd.DataFrame(data)

        # Сохранение в Excel с использованием pandas и xlsxwriter
        output = BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, index=False, sheet_name='Staff Monthly Report')

            # Настройка ширины столбцов и форматирование
            workbook = writer.book
            worksheet = writer.sheets['Staff Monthly Report']
            border_format = workbook.add_format({'border': 1})
            highlight_format = workbook.add_format({'bg_color': 'pink', 'border': 1})

            # Настройка ширины столбцов
            for idx, col in enumerate(df.columns):
                max_len = max(
                    df[col].astype(str).map(len).max(),  # длина самой длинной строки в колонке
                    len(col)  # длина названия колонки
                ) + 2  # немного добавим для запаса
                worksheet.set_column(idx, idx, max_len)

            # Применение границ и подсветки
            for row_num, (index, row_data) in enumerate(df.iterrows()):
                for col_num, cell_value in enumerate(row_data):
                    format_to_apply = highlight_format if row_data['Всего переработок'] > 0 else border_format
                    worksheet.write(row_num + 1, col_num, cell_value, format_to_apply)

            # Применение границ к заголовкам
            for col_num, col_name in enumerate(df.columns):
                worksheet.write(0, col_num, col_name, border_format)

        output.seek(0)

        return StreamingResponse(
            output,
            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            headers={'Content-Disposition': f'attachment; filename=staff_monthly_report_{year}_{month}.xlsx'}
        )

    except Exception as e:
        print("Error generating Excel file:", e)
        raise