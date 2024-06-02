from DB.dto_model import StaffDTO, TimeDTO
from DB.model import Staff, Time_set
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException


async def create_user(data: StaffDTO, db: AsyncSession):
    # Проверка на существование пользователя
    try:
        query = select(Staff).filter(Staff.name == data.name, Staff.surname == data.surname)
        result = await db.execute(query)
        existing_user = result.scalar_one_or_none()

        if existing_user:
            raise ValueError(f"User with name '{data.name}' and surname '{data.surname}' already exists.")
        
        # Создание нового пользователя
        user = Staff(name=data.name, surname=data.surname)
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


async def get_staff(db: AsyncSession):
    try:
        stmnt = select(Staff)
        result = await db.execute(stmnt)
        staff_list = result.scalars().all()

        return staff_list
    except SQLAlchemyError as e:
        print("Error get_staff:", e)
        raise
    except Exception as e:
        print("Unexpected error get_staff:", e)
        raise


async def set_time(data: TimeDTO, db: AsyncSession, id: int):
    existing_staff = await db.get(Staff, id)
    if not existing_staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    time_p = Time_set(
        time_in=data.time_in,
        time_out=data.time_out,
        date_set=data.date_set,
        overtime=data.overtime,
        comment=data.comment,
        staff_id=id
    )
    try:
        db.add(time_p)
        await db.commit()
        await db.refresh(time_p)

        return time_p
    except SQLAlchemyError as e:
        await db.rollback()
        print("Error create_user:", e)
        raise
    except Exception as e:
        await db.rollback()
        print("Unexpected error create_user:", e)
        raise
