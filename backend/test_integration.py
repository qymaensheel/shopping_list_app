import unittest
from main import create_app
from config import TestConfig
from extensions import db

"""
python -m coverage run -m unittest
python -m coverage report
"""


class ApiTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.init_app(self.app)

            db.create_all()

    def tearDown(self) -> None:
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_one_list(self):
        """Test get one list present in db"""
        _signup_response = self.client.post('/authentication/sign_up',
                                            json={"username": "user_test1", "email": "user@test.pl",
                                                  "password": "test_passw0rd"}
                                            )
        login_response = self.client.post('/authentication/login',
                                          json={"username": "user_test1",
                                                "password": "test_passw0rd"}
                                          )

        access_token = login_response.json['access_token']

        create_list_response = self.client.post('/shopping_list/shopping_lists',
                                                json={
                                                    "title": "Test Shopping List",
                                                    "items": "Test items"
                                                },
                                                headers={
                                                    "Authorization": f"Bearer {access_token}"
                                                })

        status_code = create_list_response.status_code

        self.assertEqual(status_code, 201)
        res = self.client.get('/shopping_list/shopping_lists')
        _id = res.get_json()[0]["id"]
        response = self.client.get(f'/shopping_list/shopping_list/{_id}')

        status_code = response.status_code

        self.assertEqual(status_code, 200)

    def test_get_one_list_non_existent(self):
        """Test get one list not present in db"""
        _signup_response = self.client.post('/authentication/sign_up',
                                            json={"username": "user_test1", "email": "user@test.pl",
                                                  "password": "test_passw0rd"}
                                            )
        login_response = self.client.post('/authentication/login',
                                          json={"username": "user_test1",
                                                "password": "test_passw0rd"}
                                          )

        access_token = login_response.json['access_token']

        create_list_response = self.client.post('/shopping_list/shopping_lists',
                                                json={
                                                    "title": "Test Shopping List",
                                                    "items": "Test items"
                                                },
                                                headers={
                                                    "Authorization": f"Bearer {access_token}"
                                                })

        status_code = create_list_response.status_code

        self.assertEqual(status_code, 201)

        _id = 2
        response = self.client.get(f'/shopping_list/shopping_list/{_id}')
        status_code = response.status_code

        self.assertEqual(status_code, 404)

    def test_create_list_and_fetch(self):
        """Test create list and fetch it"""
        _signup_response = self.client.post('/authentication/sign_up',
                                            json={"username": "user_test1", "email": "user@test.pl",
                                                  "password": "test_passw0rd"}
                                            )
        login_response = self.client.post('/authentication/login',
                                          json={"username": "user_test1",
                                                "password": "test_passw0rd"}
                                          )

        access_token = login_response.json['access_token']

        create_list_response = self.client.post('/shopping_list/shopping_lists',
                                                json={
                                                    "title": "Test Shopping List",
                                                    "items": "Test items"
                                                },
                                                headers={
                                                    "Authorization": f"Bearer {access_token}"
                                                })

        status_code = create_list_response.status_code

        self.assertEqual(status_code, 201)

        res = self.client.get('/shopping_list/shopping_lists')
        lists = res.get_json()

        self.assertEqual(lists, [{'id': 1, 'items': 'Test items', 'title': 'Test Shopping List'}])

    def test_refresh_token(self):
        """Test refresh token"""
        signup_response = self.client.post('/authentication/sign_up',
                                           json={"username": "user_test1", "email": "user@test.pl",
                                                 "password": "test_passw0rd"}
                                           )
        login_response = self.client.post('/authentication/login',
                                          json={"username": "user_test1",
                                                "password": "test_passw0rd"}
                                          )
        refresh_token = login_response.json['refresh_token']

        refresh_response = self.client.post('/authentication/refresh',
                                            headers={
                                                "Authorization": f"Bearer {refresh_token}"
                                            })

        self.assertEqual(refresh_response.status_code, 200)

1
if __name__ == '__main__':
    unittest.main()
