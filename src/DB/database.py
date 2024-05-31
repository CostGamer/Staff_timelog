from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase


DRIVER_NAME = "mysql+aiomysql"
DB_USERNAME = "root"
DB_PASSWORD = "Sprint_1234"
DB_HOST = "localhost"
DB_PORT = "3306"
DB_NAME = "huin"

SQL_URL = f'{
    DRIVER_NAME}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

# SQL_URL = 'sqlite///./staff.db'

engine = create_async_engine(url=SQL_URL)
session = async_sessionmaker(
    bind=engine, autoflush=False, autocommit=False, expire_on_commit=True)


async def get_db():
    async with session() as db:
        yield db