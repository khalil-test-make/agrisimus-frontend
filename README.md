Agrisimus - Dockerized

Structure:
- frontend/   (static site + Dockerfile nginx)
- backend/    (FastAPI wrapper for Machine Learning + Dockerfile)
- docker-compose.yml

Build & run (from project root):
  docker compose build
  docker compose up

Frontend: http://localhost
Backend API: http://localhost:8000

Note:
- script.js was updated to call backend at port 8000 on same host.
- Inspect backend/predict_disease.py and backend/digital_twin_ml.py to ensure function signatures:
    - predict_disease(data: dict) -> any
    - run_digital_twin(data: dict) -> any
- If your scripts expect files or models, add them to backend and adjust code to load them.
