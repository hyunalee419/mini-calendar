# mini-calendar
This project is mini features calendar.

- [front-end](./calendar-frontend)
- [back-end](./calendar-backend)

## Project Stack
### Client
- based Create React App
- React
- SaSS

#### How to set
- local
```
npm install
npm start
```
[localhost:3000](http://localhost:3000)

- production
```
npm build
```

### Server
- Python3
- Django
- [django-cors-headers](https://pypi.org/project/django-cors-headers/)
- [Django RESTframework](https://www.django-rest-framework.org/tutorial/quickstart/)

#### How to set
```
python3 manage.py makemigrations event --settings=base.settings.dev
python3 manage.py migrate event --settings=base.settings.dev
```

#### Run Server
```
// python3 manage.py runserver --settings={settings 파일 경로}
python3 manage.py runserver --settings=base.settings.dev
```
[localhost:8000](http://localhost:8000)
