from fastapi import FastAPI
from routers.default_route import router as default_route

app = FastAPI()

app.include_router(default_route)