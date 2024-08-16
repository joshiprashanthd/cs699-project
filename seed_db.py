import requests
import csv
import json

ADMIN_USERNAME = "admin@test.com"
ADMIN_PASSWORD = "admin"

API_BASE_URL = "http://localhost:8080/api"

FILE_PATH = "./books.csv"

MAX_BOOKS_TO_ADD = 50


def login_as_admin():
    jsonData = json.dumps({
        'email': ADMIN_USERNAME,
        'password': ADMIN_PASSWORD
    })
    response = requests.post(f"{API_BASE_URL}/users/login",
                             data=jsonData, headers={"Content-Type": "application/json"})
    if response.status_code == 401:
        print("INVALID_CONFIGURATION: Please check the admin credentials!")
        return None
    token = response.json()['token']
    return token


def make_add_book_request(token, title, subtitle, authors, genre, description, publishedYear, numPages, imageUrl, avgRating, ratingsCount):
    book = {
        'title': title,
        'authors': authors,
        'genre': genre,
        'description': description,
        'publishedYear': publishedYear,
        'imageUrl': imageUrl,
        'numPages': numPages,
        'averageRating': avgRating,
        'ratingsCount': ratingsCount
    }
    if subtitle != '':
        book['subtitle'] = subtitle
    jsonData = json.dumps(book)
    response = requests.post(f"{API_BASE_URL}/books", data=jsonData, headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    })
    return True


def main():
    api_token = login_as_admin()
    if api_token == None:
        return
    add_cnt = 0
    with open(FILE_PATH) as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            if csvreader.line_num == 1:
                continue
            success = make_add_book_request(
                token=api_token,
                title=row[2],
                subtitle=row[3],
                authors=row[4],
                genre=row[5],
                description=row[7],
                publishedYear=int(row[8]),
                numPages=int(row[10]),
                imageUrl=row[6],
                avgRating=float(row[9]),
                ratingsCount=int(row[11]))

            if success:
                add_cnt += 1

            if add_cnt == MAX_BOOKS_TO_ADD:
                break
    print(f"Successfully added {MAX_BOOKS_TO_ADD} books!")


if __name__ == '__main__':
    main()
