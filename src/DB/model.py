from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy import String, DateTime
from datetime import datetime


class Base(DeclarativeBase):
    pass


class Staff(Base):
    __tablename__ = "staff"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(length=50))
    surname: Mapped[str] = mapped_column(String(length=50))
    time_in: Mapped[datetime] = mapped_column(DateTime, nullable= True)
    time_out: Mapped[datetime] = mapped_column(DateTime, nullable= True)


class Time(Base):
    ...