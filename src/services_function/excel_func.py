import pandas as pd
from io import BytesIO
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, extract, func, and_
from sqlalchemy.orm import aliased
from DB.model import Staff, Time_set
from datetime import datetime

async def generate_excel_file_day(db: AsyncSession, date: datetime):
    try:
        # Получение данных сотрудников с данными за указанный день
        stmt = select(
            Staff.id,
            Staff.name,
            Staff.surname,
            Time_set.time_in,
            Time_set.time_out,
            Time_set.date_set,
            Time_set.hours,
            Time_set.overtime,
            Time_set.comment
        ).outerjoin(Time_set, and_(Staff.id == Time_set.staff_id, Time_set.date_set == date.date()))
        
        result = await db.execute(stmt)
        records = result.fetchall()
        
        # Получение данных времени для каждого сотрудника
        data = []
        for record in records:
            data.append({
                "Имя": record.name,
                "Фамилия": record.surname,
                "Время прихода": record.time_in.strftime('%H:%M:%S') if record.time_in else "None",
                "Время ухода": record.time_out.strftime('%H:%M:%S') if record.time_out else "None",
                "День": record.date_set.strftime('%Y-%m-%d') if record.date_set else "None",
                "Часы": record.hours if record.hours is not None else "None",
                "Переработки": record.overtime if record.overtime is not None else "None",
                "Комментарий": record.comment if record.comment else "None"
            })

        # Создание DataFrame
        df = pd.DataFrame(data)
        
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

        output.seek(0)

        return StreamingResponse(
            output,
            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            headers={'Content-Disposition': f'attachment; filename=staff_report_{date.strftime("%Y-%m-%d")}.xlsx'}
        )

    except Exception as e:
        print("Error generating Excel file:", e)
        raise



async def generate_excel_file_month(db: AsyncSession, year: int, month: int):
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

        # Основной запрос с левым соединением
        stmt = select(
            Staff.id,
            Staff.name,
            Staff.surname,
            func.coalesce(subquery.c.total_hours, 0).label('total_hours'),
            func.coalesce(subquery.c.total_overtime, 0).label('total_overtime')
        ).outerjoin(subquery, Staff.id == subquery.c.staff_id)

        result = await db.execute(stmt)
        records = result.fetchall()

        # Подготовка данных для создания DataFrame
        data = []
        for record in records:
            data.append({
                "ID": record.id,
                "Имя": record.name,
                "Фамилия": record.surname,
                "Всего часов": record.total_hours,
                "Всего переработок": record.total_overtime
            })

        # Создание DataFrame
        df = pd.DataFrame(data)

        # Сохранение в Excel
        output = BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Staff Monthly Report')

            # Настройка ширины столбцов
            worksheet = writer.sheets['Staff Monthly Report']
            for column in worksheet.columns:
                max_length = 0
                column = [cell for cell in column]
                for cell in column:
                    try:
                        if len(str(cell.value)) > max_length:
                            max_length = len(cell.value)
                    except:
                        pass
                adjusted_width = (max_length + 2)
                worksheet.column_dimensions[column[0].column_letter].width = adjusted_width

        output.seek(0)

        return StreamingResponse(
            output,
            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            headers={'Content-Disposition': f'attachment; filename=staff_monthly_report_{year}_{month}.xlsx'}
        )

    except Exception as e:
        print("Error generating Excel file:", e)
        raise