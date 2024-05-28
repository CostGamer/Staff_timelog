from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class StaffDTO(BaseModel):
    name: str
    surname: str


class TimeDTO(BaseModel):
    time_in: Optional[datetime] = None
    time_out: Optional[datetime] = None
    comment: Optional[str] = None


class OvertimeDTO(BaseModel):   
    overtime: Optional[float] = None
