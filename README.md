# FastAPI For Dummies - 101
A hands-on guide to FastAPI for beginners. Explore the code, run the examples, and start building your own APIs! 
Contributions and feedback are welcome. 

# What is FastAPI?
FastAPI is a modern, high-performance Python web framework designed for building APIs quickly and efficiently. It is built on top of Starlette (for handling asynchronous requests) and Pydantic (for data validation and serialization). FastAPI is particularly well-suited for building RESTful APIs and supports asynchronous programming out of the box.


# How is FastAPI Different from Django and Flask?

| Feature                  | Django                          | Flask                           | FastAPI                         |
|--------------------------|----------------------------------|----------------------------------|----------------------------------|
| **Type**                 | Full-stack framework            | Microframework                   | API-focused framework            |
| **Performance**          | Moderate                        | Moderate                        | High                            |
| **Asynchronous Support**  | Limited                         | Limited (with Quart)             | Native                          |
| **Data Validation**       | Manual / DRF Serializers         | External libraries (Marshmallow) | Built-in (Pydantic)             |
| **Automatic Documentation** | No (requires DRF + extensions) | No (requires Flask-RESTX)        | Yes (Swagger UI & ReDoc)         |
| **Learning Curve**        | Steep                           | Easy                             | Moderate                        |
| **Best For**              | Full-stack web apps             | Small to medium projects         | High-performance APIs, microservices |

# What is the file structure of FastAPI?
The file structure of a FastAPI project is typically lightweight and flexible, similar to Flask. Here's a concise overview:

```
project_root/
│
├── main.py               # Entry point of the application (defines the FastAPI app instance and routes).
├── models/               # Pydantic models for request/response validation (optional, can be in main.py for small projects).
├── routers/              # Modular route handlers (split routes into separate files for better organization).
├── static/               # Static files (if serving frontend assets, optional).
├── templates/            # HTML templates (if rendering pages, optional).
├── tests/                # Unit and integration tests.
├── requirements.txt      # Lists all Python dependencies.
├── .env                  # Environment variables (optional, for sensitive data like API keys).
└── config.py             # Configuration settings (e.g., database connections, environment-specific settings).
```

## Key Note:
**Minimalism** : Unlike Django, FastAPI doesn’t enforce a strict structure, so you can organize files as per your project’s needs.


## The goal of this repo is to demonstrate the 2 main standout features of FastAPI 'Asynchronous programming' and 'WebSockets'.

### Create venv (MACOS / LINUX SPECIFIC):
```
python3 -m venv .venv
source .venv/bin/activate 
```

### Install FastAPI and Uvicorn:
• FastAPI is the framework we’ll use to build the app. <br/>
• Uvicorn is an ASGI server that will run the FastAPI app. <br/>
```
pip install fastapi uvicorn
```

### Run the App in local
```
uvicorn main:app --reload --port 8000
```


### What is Type Hinting?
```
@router.get("/")
async def read_root(request: Request): # hint that request is of type Request
    return { "message": "Welcome to FastAPI Tutorial for Dummies"}
```
FastAPI relies heavily on **type hints** to automatically infer things like: <br/>
• How to parse incoming data. <br/>
• What kind of request object is being passed (e.g., HTTP request, WebSocket, etc.). <br/>
• How to generate automatic API documentation (Swagger UI, ReDoc). <br/>
Without the type hint, FastAPI won’t know that request is an instance of Request. This can lead to: <br/>
• Missing features like automatic request parsing. <br/>
• Lack of proper validation or error handling. <br/>
• Incomplete or incorrect API documentation. <br/>


### Inbuilt API documentation
#### 1. Access Swagger UI
When you run your FastAPI app, Swagger UI is available at:
```
http://127.0.0.1:8000/docs
```

#### 2. Access ReDoc
FastAPI also provides ReDoc (better readability), an alternative documentation interface, at:
```
http://127.0.0.1:8000/redoc
```


### What is Pydantic?
Pydantic is a Python library for data parsing and validation. It allows you to define data models using Python classes, and it automatically validates the data against the defined schema.

### How Pydantic is used in FastAPI:
#### 1. Data Validation for Request Bodies and Data Serialization for Responses
```
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float = 10.5

@app.post("/items/")
async def create_item(item: Item):
    return item
```

#### 2. Data Validation for Query Parameters
```
from pydantic import BaseModel, Query

class ItemQueryParams(BaseModel):
    skip: int = Query(0, ge=0)
    limit: int = Query(10, gt=0, le=100)

@app.get("/items/")
async def read_item(q: ItemQueryParams = Query(None)):
    return {"message": "Query params parsed successfully"}
```

• If the validation succeeds: Pass the validated values to the function. <br/>
• If the validation fails: Return an appropriate error response (e.g., 422 Unprocessable Entity) with details about the validation errors. <br/>

### Logging
In your main app configure the logger
```
import logging

# Configure logging globally
logging.basicConfig(
    level=logging.INFO,  # Set the log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Log format
    handlers=[
        logging.StreamHandler(),  # Log to the console
        # Uncomment the next line to log to a file
        # logging.FileHandler("app.log")
    ]
)

logger = logging.getLogger(__name__) 
```
Now you can use this logger in other modules
```
import logging
logger = logging.getLogger(__name__) # This is logger configured in the main app

@app.get("/log")
async def log_data(name: str):
    logger.info(f"This is how you log your data: {name}")
    return {"msg": "ok"}

```

## Event Loop - The fundamental concept in asynchronous programming!
### What is an Event Loop?
Event loop allows a program to perform non-blocking operations by continuously checking for tasks that are ready to run and executing them.

### How Does It Work?
• The event loop manages a queue of tasks (also called coroutines or callbacks). <br/>
• When a task is waiting for an operation (e.g., I/O, network requests, or timers), the event loop pauses that task and switches to another task that is ready to run. <br/>
• Once the waiting operation completes, the event loop resumes the paused task from where it left off. <br/>
• This process enables efficient multitasking without blocking the execution of other tasks. <br/>


## Lifespan Events
Lifespan events in FastAPI allow you to define actions that should occur during application startup and shutdown. These events are particularly useful for managing resources like database connections, external services, or cache systems.

### Implementation Methods 
#### 1. Using the *lifespan* Context Manager
```
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup code
    await initialize_database() # Create database
    app.state.background_task = asyncio.create_task(periodic_cleanup())  # Start background task

    yield  # This is where FastAPI runs
   
    # Shutdown code
    await close_database_connection() # Close all DB connections
    app.state.background_task.cancel() # Cancel background task

app = FastAPI(lifespan=lifespan)
```
#### 2. Using *Event Handlers* (Legacy Approach)
```
app = FastAPI()

@app.on_event("startup")
async def startup_event():
    print("Starting up...")
    await initialize_database()

@app.on_event("shutdown")
async def shutdown_event():
    print("Shutting down...")
    await close_database_connection()
```


## State Management
State management in FastAPI allows you to share and persist data across different parts of your application. 
### Implementation Methods 
#### 1. Using the *app.state* for application-wide constants and resources
```
app = FastAPI()
app.state.db = YourDatabase()
app.state.counter = 0

@app.get("/")
async def read_state():
    app.state.counter += 1
    return {"counter": app.state.counter}
```
#### 2. Session Management using *fastapi_sessions*
```
from fastapi_sessions import SessionMiddleware, Session
from fastapi import Depends

app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

@app.get("/set-session")
async def set_session(session: Session = Depends()):
    session["user_id"] = "123"
    return {"message": "Session set"}

@app.get("/get-session")
async def get_session(session: Session = Depends()):
    return {"user_id": session.get("user_id")}
```
You can also use Depends for DB management tools like **Redis** and **SQLAlchemy**
Consider using external storage (Redis, Database) for distributed state.
```
import aioredis
from fastapi import Depends

async def get_redis():
    redis = await aioredis.create_redis_pool('redis://localhost')
    try:
        yield redis
    finally:
        redis.close()
        await redis.wait_closed()

@app.get("/cached-data/{key}")
async def get_cached_data(key: str, redis: aioredis.Redis = Depends(get_redis)):
    cached_value = await redis.get(key)
    if cached_value:
        return {"value": cached_value.decode()}
    return {"value": None}
```
#### 2. Thread-Safe State Management using *Lock*
```
from threading import Lock

class ThreadSafeState:
    def __init__(self):
        self._counter = 0
        self._lock = Lock()
    
    def increment(self):
        with self._lock:
            self._counter += 1
            return self._counter

safe_state = ThreadSafeState()

@app.get("/increment")
async def increment_counter():
    return {"count": safe_state.increment()}
```

## Takeaway List
1. **Asynchronous Programming:**
Use async/await for non-blocking, high-performance APIs.
Ideal for I/O-bound tasks like database queries and HTTP requests.
2. **WebSockets:**
Enables real-time, bidirectional communication (e.g., chat apps).
3. **Automatic API Documentation:**
Swagger UI (/docs) and ReDoc (/redoc) provide interactive API docs.
4. **Type Hints & Pydantic Models:**
Validate request/response data with Python type hints and Pydantic.
5. **Dependency Injection:**
Share reusable logic (e.g., DB connections, auth) across routes.
6. **Routing & Modularization:**
Organize routes using APIRouter for scalability.
7. **Error Handling:**
Use HTTPException for standardized error responses.
8. **Background Tasks:**
Run long-running tasks after sending a response.
9. **Static Files & Templating:**
Serve static assets and render HTML templates with ease.
10. **Security:**
Built-in support for OAuth2, JWT, API keys, and more.
11. **Performance:**
FastAPI is one of the fastest Python frameworks, leveraging ASGI and async capabilities.
12. **Testing:**
Use TestClient for easy API testing with pytest.
13. **Event-Driven Architecture:**
Use lifespan events (startup, shutdown) for app initialization and cleanup.
14. **OpenAPI Compliance:**
Automatically generates OpenAPI and JSON Schema documentation.
15. **Scalability:**
Modular design and async support make it suitable for small to large applications.