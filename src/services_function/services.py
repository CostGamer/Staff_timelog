from DB.dto_model import StaffDTO, TimeDTO, TimeUpdateDTO, DepartmentDTO
from DB.model import Staff, Time_set, Department
from sqlalchemy import select, delete, and_, func, update, exc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException


async def create_user(data: StaffDTO, db: AsyncSession, id: int):
    '''
    Создает пользователя
    '''
    # Проверка на существование пользователя
    try:
        query = select(Staff).where(Staff.name == data.name.title(), Staff.surname == data.surname.title(), Staff.fathername == data.fathername.title())
        result = await db.execute(query)
        existing_user = result.scalar_one_or_none()

        if existing_user:
            raise ValueError(f"User with name '{data.name.title()}', surname '{data.surname.title()}', fathename '{data.fathername.title()}' already exists.")
        
        # Создание нового пользователя
        user = Staff(name=data.name.title(), surname=data.surname.title(), fathername=data.fathername.title(), bid=data.bid, department = id)
        db.add(user)
        await db.commit()
        await db.refresh(user)

        return user
        
    except SQLAlchemyError as e:
        await db.rollback()
        print("Error create_user:", e)
        raise
    except Exception as e:
        await db.rollback()
        print("Unexpected error create_user:", e)
        raise

    
async def add_dep(data: DepartmentDTO, db: AsyncSession):
    '''
    Добавляет отдел
    '''
    try:
        query = select(Department).where(Department.name == data.dep_name.title())
        result = await db.execute(query)
        existing_user = result.scalar_one_or_none()

        if existing_user:
            raise ValueError(f"Department with name: {data.dep_name.title()} already exists")

        dep = Department(name=data.dep_name.title())
        db.add(dep)
        await db.commit()
        await db.refresh(dep)

        return dep
    
    except SQLAlchemyError as e:
        await db.rollback()
        print("Error add_dep:", e)
        raise
    except Exception as e:
        await db.rollback()
        print("Unexpected error add_dep:", e)
        raise


async def get_staff(db: AsyncSession):
    '''
    Возвращает список пользователей
    '''
    try:
        stmnt = select(
            Staff.id,
            func.concat(Staff.surname, ' ', Staff.name, ' ', Staff.fathername).label('full_name')
            )
        result = await db.execute(stmnt)
        staff_list = result.fetchall()

        data = [{"id": record.id, "fullname": record.full_name} for record in staff_list]

        return data
    except SQLAlchemyError as e:
        print("Error get_staff:", e)
        raise
    except Exception as e:
        print("Unexpected error get_staff:", e)
        raise


async def get_dep(db: AsyncSession):
    '''
    Возвращает список отделов
    '''
    try:
        stmnt = select(
            Department.id,
            Department.name
        )
        result = await db.execute(stmnt)
        dep_list = result.fetchall()

        data = [{"id": record.id, "department": record.name} for record in dep_list]

        return data
    except SQLAlchemyError as e:
        print("Error get_dep:", e)
        raise
    except Exception as e:
        print("Unexpected error get_dep:", e)
        raise


async def set_time(data: TimeDTO, db: AsyncSession, id: int):
    '''
    Устанавливает время у пользователей
    '''
    # Проверка существования пользователя
    existing_staff = await db.get(Staff, id)
    if not existing_staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    # Проверка на существующую запись
    existing_record_stmt = select(Time_set).where(
        and_(
            Time_set.staff_id == id,
            Time_set.date_set == data.date_set
        )
    )
    result = await db.execute(existing_record_stmt)
    existing_record = result.scalar()

    if existing_record:
        raise HTTPException(status_code=400, detail="Record for this date already exists")

    # Вычисление часов (hours)
    if data.time_in and data.time_out:
        time_in_seconds = data.time_in.hour * 3600 + data.time_in.minute * 60
        time_out_seconds = data.time_out.hour * 3600 + data.time_out.minute * 60
        hours_worked = (time_out_seconds - time_in_seconds) / 3600
        if round(hours_worked, 2) > 4:
            hours_worked = round(hours_worked, 2) - 1
        else:
            hours_worked = round(hours_worked, 2)
    else:
        hours_worked = None

    time_p = Time_set(
        time_in=data.time_in,
        time_out=data.time_out,
        date_set=data.date_set,
        overtime=data.overtime,
        hours=hours_worked, 
        comment=data.comment,
        staff_id=id
    )

    try:
        db.add(time_p)
        await db.commit()
        await db.refresh(time_p)

        return time_p
    except exc.SQLAlchemyError as e:
        await db.rollback()
        print("Error set_time:", e)
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as e:
        await db.rollback()
        print("Unexpected error set_time:", e)
        raise HTTPException(status_code=500, detail="Unexpected error")


async def update_time(id: int, data: TimeUpdateDTO, db: AsyncSession):
    # Проверка существования сотрудника
    existing_staff = await db.get(Staff, id)
    if not existing_staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    # Проверка существования записи о времени
    existing_record_stmt = select(Time_set).where(
        Time_set.staff_id == id,
        Time_set.date_set == data.date_set
    )
    result = await db.execute(existing_record_stmt)
    existing_record = result.scalar()

    if not existing_record:
        raise HTTPException(status_code=404, detail="Time record not found for this date")

    update_data = {}
    
    if data.time_in and data.time_out:
        time_in_seconds = data.time_in.hour * 3600 + data.time_in.minute * 60
        time_out_seconds = data.time_out.hour * 3600 + data.time_out.minute * 60
        hours_worked = (time_out_seconds - time_in_seconds) / 3600
        if round(hours_worked, 2) > 4:
            update_data['hours'] = round(hours_worked, 2) - 1
        else:
            update_data['hours'] = round(hours_worked, 2)
    else:
        update_data['hours'] = None

    # Проверка и добавление в update_data только тех полей, которые не равны None
    if data.time_in is not None:
        update_data['time_in'] = data.time_in
    if data.time_out is not None:
        update_data['time_out'] = data.time_out
    if data.overtime is not None:
        update_data['overtime'] = data.overtime
    if data.comment is not None:
        update_data['comment'] = data.comment

    try:
        # Обновление записи о времени
        stmt = update(Time_set).where(
            Time_set.staff_id == id,
            Time_set.date_set == data.date_set
        ).values(update_data)

        await db.execute(stmt)
        await db.commit()

        return {"message": "Time record updated successfully"}

    except SQLAlchemyError as e:
        await db.rollback()
        print("Error update_time:", e)
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as e:
        await db.rollback()
        print("Unexpected error update_time:", e)
        raise HTTPException(status_code=500, detail="Unexpected error")


async def delete_user(id: int, db: AsyncSession):
    try:
        query = select(Staff).where(Staff.id == id)
        result = await db.execute(query)
        existing_user = result.scalar_one_or_none()

        if existing_user is None:
            raise ValueError(f"User does not exist.")
        
        # Создание нового пользователя
        del_query = delete(Staff).where(Staff.id == id)
        await db.execute(del_query)
        await db.commit()

        return "Successfully deleted"
        
    except SQLAlchemyError as e:
        await db.rollback()
        print("Error delete_user:", e)
        raise
    except Exception as e:
        await db.rollback()
        print("Unexpected error delete_user:", e)
        raise


async def update_dep(id: int, new_name: str, db: AsyncSession):
    try:
        query = select(Department).where(Department.id == id)
        result = await db.execute(query)
        existing_department = result.scalar_one_or_none()

        if existing_department is None:
            raise ValueError("Department does not exist.")
        
        update_query = update(Department).where(Department.id == id).values(name=new_name.title())
        await db.execute(update_query)
        await db.commit()

        return "Successfully updated"
        
    except SQLAlchemyError as e:
        await db.rollback()
        print("Error update_dep:", e)
        raise
    except Exception as e:
        await db.rollback()
        print("Unexpected error update_dep:", e)
        raise
