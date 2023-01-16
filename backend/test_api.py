import unittest
from main import create_app
from config import TestConfig
from extensions import db

"""
python -m coverage run -m unittest
python -m coverage report
"""


class ApiTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)

        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.init_app(self.app)

            db.create_all()

    def tearDown(self) -> None:
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_signup(self):
        signup_response = self.client.post('/authentication/sign_up',
                                           json={"username": "user_test1", "email": "user@test.pl",
                                                 "password": "test_passw0rd"}
                                           )
        status_code = signup_response.status_code
        self.assertEqual(status_code, 201)

    def test_login(self):
        signup_response = self.client.post('/authentication/sign_up',
                                           json={"username": "user_test1", "email": "user@test.pl",
                                                 "password": "test_passw0rd"}
                                           )
        login_response = self.client.post('/authentication/login',
                                          json={"username": "user_test1",
                                                "password": "test_passw0rd"}
                                          )
        status_code = login_response.status_code
        self.assertEqual(status_code, 200)

    def test_get_lists(self):
        """TEST - get all lists"""
        res = self.client.get('/shopping_list/shopping_lists')

        # print(res.json)
        status_code = res.status_code

        self.assertEqual(status_code, 200)

    def test_get_one_list(self):
        _id = 1
        response = self.client.get(f'/shopping_list/shopping_lists/{_id}')

        status_code = response.status_code

        self.assertEqual(status_code, 404)

    def test_create_list(self):
        signup_response = self.client.post('/authentication/sign_up',
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

    def test_update_list(self):
        signup_response = self.client.post('/authentication/sign_up',
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
        _id = 1

        update_response = self.client.put(f'/shopping_list/shopping_list/{_id}',
                                          json={
                                              "title": "Test Shopping List changed",
                                              "items": "Test items changed"
                                          },
                                          headers={
                                              "Authorization": f"Bearer {access_token}"
                                          })
        status_code = update_response.status_code

        self.assertEqual(status_code, 200)

    def test_delete_list(self):
        signup_response = self.client.post('/authentication/sign_up',
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
        _id = 1

        delete_response = self.client.delete(f'/shopping_list/shopping_list/{_id}',
                                             headers={
                                                 "Authorization": f"Bearer {access_token}"
                                             })
        status_code = delete_response.status_code

        self.assertEqual(status_code, 200)




if __name__ == '__main__':
    unittest.main()
