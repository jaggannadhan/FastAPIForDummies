from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
import asyncio

router = APIRouter()

# Configure Jinja2Templates to look for HTML files in the "templates" folder
templates = Jinja2Templates(directory="templates")

@router.get("/")
async def read_root(request: Request):
    """
    Landing Page:
    Renders a simple HTML page to welcome users to the FastAPI tutorial.
    """
    return templates.TemplateResponse("index.html", {"request": request})

@router.get("/async-task")
async def async_task():
    # Simulate an asynchronous task (e.g., fetching data or processing)
    await asyncio.sleep(2)  # Simulate a 2-second delay
    return {"message": "Asynchronous task completed!"}