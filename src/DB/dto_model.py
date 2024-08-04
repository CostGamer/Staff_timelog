from pydantic import BaseModel
from typing import Optional
from datetime import date, time


class StaffDTO(BaseModel):
    name: str
    surname: str
    fathername: str
    bid: float


class TimeDTO(BaseModel):
    time_in: time
    time_out: time 
    date_set: date 
    overtime: Optional[int] = None
    comment: Optional[str] = None 


class TimeUpdateDTO(BaseModel):
    time_in: time
    time_out: time
    date_set: date
    overtime: Optional[int] = None
    comment: Optional[str] = None


class DepartmentDTO(BaseModel):
    dep_name: str