from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from DB.database import get_db
from services_function import services
from DB.dto_model import StaffDTO, TimeDTO, OvertimeDTO


router = APIRouter(tags=['staff'])


@router.post('/')
async def create_user_r(data: StaffDTO = None, db: AsyncSession = Depends(get_db)):
    try:
        return await services.create_user(data, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/')
async def get_all_staff(db: AsyncSession = Depends(get_db)):
    try:
        return await services.get_staff(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post('/post')
async def set_time(id: int, data: TimeDTO, db: AsyncSession = Depends(get_db)):
    try:
        return await services.set_time(data, db, id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))