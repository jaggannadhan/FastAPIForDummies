from fastapi import FastAPI
from routers.default_route import default_router
from routers.connections_route import connections_router
import logging

from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="FastAPI Tutorial for Dummies",
    description="A simple API to demonstrate FastAPI's features.",
    version="1.0.0"
)

logging.basicConfig(
    level=logging.INFO, 
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", 
    handlers=[
        logging.StreamHandler(), 
    ]
)
logger = logging.getLogger(__name__) 

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(default_router)
app.include_router(connections_router)
