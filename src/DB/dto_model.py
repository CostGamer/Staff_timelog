from pydantic import BaseModel
from datetime import datetime


class Staff_dto(BaseModel):
    name: str
    surname: str
    time_in: datetime
    time_out: datetime