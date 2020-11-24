FROM python:latest

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

ADD . /app

CMD ["python3", "app.py"]

EXPOSE 80
