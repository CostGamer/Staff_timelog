from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from DB.database import get_db
from services_function import services
from services_function.excel_func import generate_excel_file_day, generate_excel_file_month
from DB.dto_model import StaffDTO, TimeDTO, TimeUpdateDTO
from datetime import datetime


router = APIRouter(tags=['staff'])


@router.post('/add/')
async def create_user_r(data: StaffDTO = None, db: AsyncSession = Depends(get_db)):
    try:
        return await services.create_user(data, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/settime/', response_model= TimeDTO)
async def set_time(id: int, data: TimeDTO, db: AsyncSession = Depends(get_db)):
    try:
        return await services.set_time(data, db, id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/')
async def get_all_staff(db: AsyncSession = Depends(get_db)):
    try:
        return await services.get_staff(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get('/dayx/')
async def download_excel_file(data: datetime, db: AsyncSession = Depends(get_db)):
    try:
        return await generate_excel_file_day(db, data)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error generating Excel file: " + str(e))
    
@router.get('/monthx/')
async def download_excel_file(year: int, month: int, db: AsyncSession = Depends(get_db)):
    try:
        return await generate_excel_file_month(db, year, month)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error generating Excel file: " + str(e))
    
@router.put("/update_time/")
async def update_time_endpoint(id: int, data: TimeUpdateDTO, db: AsyncSession = Depends(get_db)):
    return await services.update_time(id, data, db)