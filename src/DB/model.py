from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from sqlalchemy import String, Date, Time, ForeignKey
from datetime import time, date


class Base(DeclarativeBase):
    pass


class Staff(Base):
    __tablename__ = "staff"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(length=50))
    surname: Mapped[str] = mapped_column(String(length=50))

    times: Mapped[list["Time_set"]] = relationship("Time_set", back_populates="staff")


class Time_set(Base):
    __tablename__ = "time"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    time_in: Mapped[time] = mapped_column(Time, nullable=True)
    time_out: Mapped[time] = mapped_column(Time, nullable=True)
    date_set: Mapped[date] = mapped_column(Date, nullable=True)
    hours: Mapped[float] = mapped_column(nullable=True)
    overtime: Mapped[float] = mapped_column(nullable=True)
    comment: Mapped[str] = mapped_column(String(length=1000), nullable=True)
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.id"))

    staff: Mapped["Staff"] = relationship("Staff", back_populates="times")