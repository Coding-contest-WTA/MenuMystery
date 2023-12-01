FROM python:3.9.18-alpine3.18

WORKDIR /app
COPY build/back/menu-mystery.com.crt /app/menu-mystery.com.crt
COPY build/back/menu-mystery.com.key /app/menu-mystery.com.key

COPY back/* /app/

RUN pip install -r /app/requirements.txt

ENV FLASK_APP=main.py

CMD sleep 40 && flask run --host=0.0.0.0