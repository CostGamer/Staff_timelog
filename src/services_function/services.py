from DB.dto_model import StaffDTO, TimeDTO, OvertimeDTO
from DB.model import Staff, Time, Overtime
from sqlalchemy import select, delete, sele
from sqlalchemy.ext.asyncio import AsyncSession


async def create_user(data: StaffDTO, db: AsyncSession):
    user = Staff(name= data.name, surname = data.surname)
    try:
        db.add(user)
        await db.commit()
        await db.refresh(user)
    except Exception as e:
        await db.rollback()
        print("Error create_user", e)

    return user
        

async def get_staff(db: AsyncSession):
    stmnt = select(Staff)
    result = await db.execute(stmnt)  
    staff_list = result.scalars().all()
    
    return staff_list


async def set_time(data: TimeDTO, db: AsyncSession, id: int):
    time_p = Time(time_in= data.time_in, time_out = data.time_out, comment = data.comment, staff_id= id)
    try:
        db.add(time_p)
        await db.commit()
        await db.refresh(time_p)
    except Exception as e:
        await db.rollback()
        print("Error set_time", e)

    return time_p

    