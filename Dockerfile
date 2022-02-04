FROM python:3.9
WORKDIR /flaskheathviz
COPY . /flaskheathviz/
RUN pip install -r requirements.txt
EXPOSE 8080
CMD ["python", "app.py"]