FROM python:3.9.18-alpine3.18

WORKDIR /app

COPY back/* /app/

RUN pip install -r /app/requirements.txt

ENV FLASK_APP=main.py

CMD sleep 40 && flask run --host=0.0.0.0