from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/geospatial')
def geospat():
    return render_template('geospat.html')

@app.route('/barplot')
def barplot():
    return render_template('barplot.html')


@app.route('/stackedplot')
def stackedplot():
    return render_template('pranav.html')

@app.route('/insights')
def insights():
    return render_template('insights.html')

@app.route('/twosidebarchart')
def twosidebarchart():
    return render_template('2sidebarchart.html')

if __name__=="__main__":
    app.run(host='0.0.0.0', port ='8080', debug=True)
