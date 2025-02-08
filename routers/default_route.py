from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
import asyncio
import httpx

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
    """
    Simulate an Asynchronous Task
    This endpoint simulates a time-consuming asynchronous operation (e.g., fetching data).
    
    Returns:
        dict: A message indicating the task is completed.
    """
    await asyncio.sleep(2)  # Simulate a 2-second delay
    return {"message": "Asynchronous task completed!"}


@router.get("/test-concurrency")
async def test_concurrency():
    async with httpx.AsyncClient() as client:
        start_time = asyncio.get_event_loop().time()
        tasks = [client.get("http://127.0.0.1:8000/async-task") for _ in range(20)]
        responses = await asyncio.gather(*tasks)
        elapsed_time = asyncio.get_event_loop().time() - start_time

    results = {
        "total_requests": len(responses),
        "total_time_seconds": round(elapsed_time, 2),
        "responses": [response.json() for response in responses],
    }
    return results
