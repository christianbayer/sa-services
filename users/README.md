# Users Service

This is a simple users service written with Lumen. It handles the actions related to users resources.

Runs on `localhost:8020` and `172.10.10.20:80`.


### Endpoints

| Route                    | Method | Params                                                                                                                          | Success                       | Failure                       |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------- |
| `/api/users/attempt`     | `POST` | ```{"email": "foo@bar.com", "password": "asecret"}```                                                                           | ```{"user": {...}}```         | ```{"error": "A message."}``` |
| `/api/users/{id}/exists` | `GET`  |                                                                                                                                 | ```{"exists": true\|false}``` | ```{"error": "A message."}``` |
| `/api/users/store`       | `POST` | ```{"name": "John Doe", "birthdate": "1990-01-01", "identity": "01234567890", "email": "foo@bar.com", "password": "johndoe"}``` | ```{"user": {...}}```         | ```{"error": "A message."}``` |
| `/api/users/fetch`       | `GET`  |                                                                                                                                 | ```{"users": {...}}```        | ```{"error": "A message."}``` |
