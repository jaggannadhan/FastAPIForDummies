from fastapi import FastAPI
from contextlib import asynccontextmanager
from routers.default_route import default_router
from routers.connections_route import connections_router
import logging


from fastapi.staticfiles import StaticFiles

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Best practice is to enclose this with a try-catch-finally block
    # Startup code
    print("Opening FastAPIForDummies") # Replace with DB connection / other setup

    yield  # This is where FastAPI runs
   
    # Shutdown code
    print("Closing FastAPIForDummies") # Finally close all connections


app = FastAPI(
    title="FastAPI Tutorial for Dummies",
    description="A simple API to demonstrate FastAPI's features.",
    version="1.0.0",
    lifespan=lifespan
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
