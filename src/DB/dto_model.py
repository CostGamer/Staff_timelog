from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, time


class StaffDTO(BaseModel):
    name: str
    surname: str


class TimeDTO(BaseModel):
    time_in: Optional[time] = None
    time_out: Optional[time] = None
    date_set: Optional[date] = None
    overtime: Optional[float] = None
    comment: Optional[str] = None


class TimeUpdateDTO(BaseModel):
    time_in: time = None
    time_out: time = None
    date_set: date = Field(..., description="Date of the time entry") 
    overtime: int = None
    comment: str = None