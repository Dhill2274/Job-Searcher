from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['GET'])
def scrape():
    data = []
    headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        " AppleWebKit/537.36 (KHTML, like Gecko)"
        " Chrome/110.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    }

    #####REED#####

    url = 'https://www.reed.co.uk/jobs/software-jobs-in-mitcham'
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": "Failed to load page"}), 500
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = soup.find_all('article', attrs={'class': 'card job-card_jobCard__MkcJD'})

    is_Next = True
    i = 1

    while is_Next == True and i < 0:
        next_button = soup.find('a', attrs={'class': 'page-link next'}).parent
        if next_button.get('class') == ['page-item disabled']:
            is_Next = False
        else:
            is_Next = True

        for job in jobs:
            div_element = job.find('a', attrs={'class': 'job-card_jobTitle__HORxw'})
            if div_element is not None:
                title = div_element.text
                description = job.find('a', attrs={'data-page-component': 'job_card'}).text
                link = div_element.get('href')
                data.append({
                    'title': title,
                    'description': description,
                    'link': f'{link}'
                })
        i += 1
        url = f'https://www.reed.co.uk/jobs/software-jobs-in-mitcham?pageno={i}'
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            print(response.status_code)
            return jsonify({"error": "Failed to load page"}), 500
        soup = BeautifulSoup(response.text, 'html.parser')
        jobs = soup.find_all('article', attrs={'class': 'card job-card_jobCard__MkcJD'})


#####JOBSITE#####

    url = 'https://www.jobsite.co.uk/jobs/software/in-london?radius=20'
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(response.status_code)
        return jsonify({"error": "Failed to load page"}), 500
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = soup.find_all('article', attrs={'class': 'res-817i67'})

    is_Next = True
    i = 1

    while is_Next == True and i < 0:
        #Change next button direction
        next_button = soup.find('a', attrs={'class': 'page-link next'}).parent
        if next_button.get('class') == ['page-item disabled']:
            is_Next = False
        else:
            is_Next = True
        
        for job in jobs:
            if job is not None:
                title = job.find('div', attrs={'class': 'res-nehv70'}).text
                description = job.find('span', attrs={'class': 'res-c0o836'}).text
                link = job.find('a', attrs={'class': 'res-1w4glxj'}).get('href')
                data.append({
                    'title': title,
                    'description': description,
                    'link': f'{link}'
                })

    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000, debug=True)