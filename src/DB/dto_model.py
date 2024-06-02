from pydantic import BaseModel
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

