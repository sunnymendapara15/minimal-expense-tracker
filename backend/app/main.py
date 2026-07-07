from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Minimal Expense Tracker API",
    description="Backend companion for the React localStorage expense tracker.",
    version="1.0.0",
)

build_dir = Path(__file__).resolve().parents[1] / "frontend" / "build"
if build_dir.exists():
    app.mount("/", StaticFiles(directory=build_dir, html=True), name="frontend")


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "message": "Expense tracker backend is healthy."}
