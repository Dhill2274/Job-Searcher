from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['GET'])
def scrape():
    url = 'https://uk.indeed.com/jobs?q=sales&l=Manchester&from=searchOnHP&vjk=46d655e6492cee59'
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Failed to load page"}), 500
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = soup.find_all('li', attrs={'class': 'css-1ac2h1w eu4oa1w0'})
    data = []

    for job in jobs:
        div_element = job.find('div', attrs={'aria-live': 'polite'})
        if div_element is not None:
            title = job.find('span', attrs={'title': True}).text
            description = job.find('span', attrs={'data-testid': 'company-name'}).text
            link = job.find('a', attrs={'class': 'jcs-JobTitle css-1baag51 eu4oa1w0'}).get('href')
            data.append({
                'title': title,
                'description': description,
                'link': f'{link}'
            })

    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000, debug=True)