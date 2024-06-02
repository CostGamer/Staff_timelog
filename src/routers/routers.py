from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from DB.database import get_db
from services_function import services
from services_function.excel_func import generate_excel_file
from DB.dto_model import StaffDTO, TimeDTO


router = APIRouter(tags=['staff'])


@router.post('/add/')
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
    
@router.post('/settime/', response_model= TimeDTO)
async def set_time(id: int, data: TimeDTO, db: AsyncSession = Depends(get_db)):
    try:
        return await services.set_time(data, db, id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get('/download-excel/')
async def download_excel_file(db: AsyncSession = Depends(get_db)):
    try:
        return await generate_excel_file(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error generating Excel file: " + str(e))