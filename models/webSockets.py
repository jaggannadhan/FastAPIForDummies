from fastapi import WebSocket
import uuid

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket):
        client_id = str(uuid.uuid4())
        self.active_connections[client_id] = websocket
        await websocket.accept()
        return client_id

    async def disconnect(self, websocket: WebSocket):
        for client_id, conn in self.active_connections.items():
            if conn == websocket:
                del self.active_connections[client_id]
                break

    async def send_personal_message(self, message: str, target_client_id: str):
        try:
            if target_client_id in self.active_connections:
                clients = list(self.active_connections.keys())
                acutal_target = clients[0] if target_client_id != clients[0] else clients[1]
                print(f"Actual target client: {acutal_target}")
                if self.active_connections[acutal_target]:
                    await self.active_connections[acutal_target].send_text(message)
            else:
                print(f"Client with ID {target_client_id} not found.")
        except Exception as e:
            print(f"Exception in send_personal_message: {e}")

