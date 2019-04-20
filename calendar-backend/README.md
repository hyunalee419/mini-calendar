# calendar-backend
This project is backend for [mini-calendar](https://github.com/hyunalee419/mini-calendar).

## How to set
```
python3 manage.py makemigrations --settings=base.settings.dev
python3 manage.py migrate --settings=base.settings.dev
```

## Run Server
```
// python3 manage.py runserver --settings={settings 파일 경로}
python3 manage.py runserver --settings=base.settings.dev
```
[localhost:8000](http://localhost:8000)
