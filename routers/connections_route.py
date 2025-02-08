from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from models.webSockets import ConnectionManager

manager = ConnectionManager()
connections_router = APIRouter()


@connections_router.websocket("/send")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        data = await websocket.receive_text()
        await manager.send_personal_message(f"You sent: {data}", websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@connections_router.websocket("/broadcast")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        await manager.broadcast(f"Broadcast message from server!")
    except WebSocketDisconnect:
        manager.disconnect(websocket)