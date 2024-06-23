import uvicorn
from fastapi import FastAPI
from contextlib import asynccontextmanager
from routers.routers import router_dep, router_excel, router_staff
from DB.database import engine
from DB.model import Base
from fastapi.middleware.cors import CORSMiddleware


async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    return


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(router_dep)
app.include_router(router_excel)
app.include_router(router_staff)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
