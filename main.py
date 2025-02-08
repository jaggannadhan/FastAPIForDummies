from fastapi import FastAPI
from routers.default_route import router as default_route
from fastapi.staticfiles import StaticFiles


app = FastAPI(
    title="FastAPI Tutorial for Dummies",
    description="A simple API to demonstrate FastAPI's features.",
    version="1.0.0"
)

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(default_route)