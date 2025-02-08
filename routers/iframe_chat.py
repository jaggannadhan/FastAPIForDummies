from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

iframe_router = APIRouter()
templates = Jinja2Templates(directory="templates")

@iframe_router.get("/iframe-chat")
async def websocket_endpoint(request: Request):
    return templates.TemplateResponse("iframe_chat.html", {"request": request})