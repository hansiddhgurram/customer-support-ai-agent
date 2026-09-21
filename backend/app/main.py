from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from backend.app.api.routes import (
    router
)

from backend.app.api.analytics_routes import router as analytics_router

from backend.app.api.incident_routes import router as incident_router

from backend.app.api.summary_routes import (
    router as summary_router
)

from backend.app.api.trends_routes import (
    router as trends_router
)

from backend.app.api.knowledge_routes import (
    router as knowledge_router
)

from backend.app.api.semantic_clusters_routes import (
    router as semantic_router
)

from socketio import ASGIApp

from backend.app.socket_manager import sio

app = FastAPI(
    title="Customer Support AI Agent"
)


app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


app.include_router(router)

app.include_router(analytics_router)

app.include_router(incident_router)

app.include_router(summary_router)

app.include_router(trends_router)

app.include_router(knowledge_router)

app.include_router(semantic_router)

@app.get("/")
def root():

    return {
        "message": "Customer Support AI Agent Running"
    }


@app.get("/health")
def health_check():

    return {
        "status": "ok"
    }

socket_app = ASGIApp(
    sio,
    other_asgi_app=app
)