FROM python:3.9.18-alpine3.18

WORKDIR /app

COPY back/* /app/

COPY build/menu-mystery.com.crt /app/menu-mystery.com.crt
COPY build/menu-mystery.com.key /app/menu-mystery.com.key

RUN pip install -r /app/requirements.txt

CMD sleep 40 && python3 main.py