from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from DB.database import get_db
from services_function import services
from services_function.excel_func import generate_excel_file_day, generate_excel_file_month
from DB.dto_model import StaffDTO, TimeDTO, TimeUpdateDTO, DepartmentDTO
from datetime import datetime


router_staff = APIRouter(tags=['staff'])
router_dep = APIRouter(tags=['dep'])
router_excel = APIRouter(tags=['excel'])


@router_staff.post('/add/', description= 'Впиши id отдела')
async def create_user_r(id: int, data: StaffDTO = None, db: AsyncSession = Depends(get_db)):
    try:
        return await services.create_user(data, db, id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router_staff.post('/settime/', response_model= TimeDTO)
async def set_time(id: int, data: TimeDTO, db: AsyncSession = Depends(get_db)):
    try:
        return await services.set_time(data, db, id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router_dep.post('/dep/')
async def add_department(data: DepartmentDTO, db: AsyncSession = Depends(get_db)):
    try:
        return await services.add_dep(data, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router_staff.get('/gs/')
async def get_all_staff(db: AsyncSession = Depends(get_db)):
    try:
        return await services.get_staff(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router_dep.get('/gd/')
async def get_all_dep(db: AsyncSession = Depends(get_db)):
    try:
        return await services.get_dep(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router_excel.get('/dayx/')
async def download_excel_file_day(department_id: int, day: int, month: int, year: int, db: AsyncSession = Depends(get_db)):
    try:
        return await generate_excel_file_day(db, department_id, day, month, year)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error generating Excel file: " + str(e))
    
@router_excel.get('/monthx/')
async def download_excel_file_month(department_id: int, year: int, month: int, db: AsyncSession = Depends(get_db)):
    try:
        return await generate_excel_file_month(db, department_id, year, month)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error generating Excel file: " + str(e))
    
@router_staff.put("/update_time/")
async def update_time(id: int, data: TimeUpdateDTO, db: AsyncSession = Depends(get_db)):
    try:
        return await services.update_time(id, data, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error update time: " + str(e))

@router_staff.delete("/delete_user/")
async def delete_user(id: int, db: AsyncSession = Depends(get_db)):
    try:
        return await services.delete_user(id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error delete user: " + str(e))
    
@router_dep.put("/update_dep/")
async def update_departure(id: int, new_name: str, db: AsyncSession = Depends(get_db)):
    try:
        return await services.update_dep(id, new_name, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error update departure: " + str(e))