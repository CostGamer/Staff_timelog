from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship, validates
from sqlalchemy import String, Date, Time, ForeignKey, CheckConstraint, Float
from datetime import time, date


class Base(DeclarativeBase):
    pass


class Time_set(Base):
    __tablename__ = "time"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    time_in: Mapped[time] = mapped_column(Time, nullable=True)
    time_out: Mapped[time] = mapped_column(Time, nullable=True)
    date_set: Mapped[date] = mapped_column(Date, nullable=True)
    hours: Mapped[float] = mapped_column(nullable=True)
    overtime: Mapped[int] = mapped_column(nullable=True)
    comment: Mapped[str] = mapped_column(String(length=1000), nullable=True)
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.id", ondelete="CASCADE"))

    staff: Mapped["Staff"] = relationship("Staff", back_populates="times")


class Staff(Base):
    __tablename__ = "staff"
    __table_args__ = (CheckConstraint("bid IN (0.5, 0.75, 1, 1.25, 1.5, 1.75, 2)", name="check_bid_values"),)

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(length=50))
    surname: Mapped[str] = mapped_column(String(length=50))
    fathername: Mapped[str] = mapped_column(String(length=50))
    bid: Mapped[float] = mapped_column(Float)
    department: Mapped[int] = mapped_column(ForeignKey("department.id", ondelete="CASCADE"))

    times: Mapped[list["Time_set"]] = relationship("Time_set", back_populates="staff", cascade="all, delete-orphan")
    staf_dep: Mapped["Department"] = relationship("Department", back_populates="staff")

    @validates('bid')
    def validate_bid(self, key, value):
        valid_bids = {0.5, 0.75, 1, 1.25, 1.5, 1.75, 2}
        if value not in valid_bids:
            raise ValueError(f"Invalid value for bid: {value}. Must be one of {valid_bids}")
        return value


class Department(Base):
    __tablename__ = "department"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(length=100))

    staff: Mapped[list["Staff"]] = relationship("Staff", back_populates="staf_dep", cascade="all, delete-orphan")