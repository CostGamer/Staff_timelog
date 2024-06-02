import pandas as pd
from io import BytesIO
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from DB.model import Staff, Time_set

async def generate_excel_file(db: AsyncSession):
    try:
        # Получение данных сотрудников
        stmt = select(
            Staff.id, 
            Staff.name, 
            Staff.surname, 
            Time_set.time_in, 
            Time_set.time_out, 
            Time_set.date_set, 
            Time_set.overtime, 
            Time_set.comment
        ).outerjoin(Time_set, Staff.id == Time_set.staff_id)
        
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
            headers={'Content-Disposition': 'attachment; filename=staff_time_log.xlsx'}
        )

    except Exception as e:
        print("Error generating Excel file:", e)
        raise
