from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from sqlalchemy import String, DateTime, ForeignKey
from datetime import datetime


class Base(DeclarativeBase):
    pass


class Staff(Base):
    __tablename__ = "staff"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(length=50))
    surname: Mapped[str] = mapped_column(String(length=50))

    times: Mapped[list["Time"]] = relationship("Time", back_populates="staff")
    overtimes: Mapped[list["Overtime"]] = relationship(
        "Overtime", back_populates="staff")


class Time(Base):
    __tablename__ = "time"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    time_in: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    time_out: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    comment: Mapped[str] = mapped_column(String(length=1000))
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.id"))

    staff: Mapped["Staff"] = relationship("Staff", back_populates="times")


class Overtime(Base):
    __tablename__ = "overtime"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    overtime: Mapped[float] = mapped_column(nullable=True)
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.id"))

    staff: Mapped["Staff"] = relationship("Staff", back_populates="overtimes")
