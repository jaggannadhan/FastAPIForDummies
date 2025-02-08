# FastAPIForDummies
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

