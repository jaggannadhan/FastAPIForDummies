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
• FastAPI is the framework we’ll use to build the app.
• Uvicorn is an ASGI server that will run the FastAPI app.
```pip install fastapi uvicorn```



