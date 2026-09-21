FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY backend/ ./backend/

ENV PYTHONPATH=/app

EXPOSE 8000

CMD ["sh", "-c", "uvicorn backend.app.main:socket_app --host 0.0.0.0 --port ${PORT:-8000}"]
