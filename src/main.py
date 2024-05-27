import uvicorn
from fastapi import FastAPI


app = FastAPI()
app.add_route()


if __name__ == "__main__":
    uvicorn.run("main:app", reload= True)