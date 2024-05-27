from DB.dto_model import Staff_dto
from DB.model import Staff
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession


async def create_user(data: Staff_dto, db: AsyncSession):
    user = Staff()

    