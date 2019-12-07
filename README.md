# EDU
Education Platform Project (Django Rest Framework + React JS)

# Backend Installation (Django)
```bash
cd backend
pip3 install -r requirements.txt
cd edu
./manage.py migrate
./manage.py runserver
```
for using Celery you must have installed redis in the system.
for starting celery:
```bash
celery -A edu worker -B
```

# Frontend Installation (React)

```bash
cd frontend
npm install
npm start
```

# Usage

open in your browser 'http://127.0.0.1:8030'