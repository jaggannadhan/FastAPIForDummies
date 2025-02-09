from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from models.webSockets import ConnectionManager
import logging
import asyncio

manager = ConnectionManager()
connections_router = APIRouter()
logger = logging.getLogger(__name__)


@connections_router.websocket("/send")
async def websocket_endpoint(websocket: WebSocket):
    client_id = await manager.connect(websocket)
    while True:
        try:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"{data}", client_id)
        except WebSocketDisconnect:
            print("Disconnecting web socket")
            manager.disconnect(websocket)


