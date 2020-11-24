# Users Service

This is a simple users service written with Lumen. It handles the actions related to users resources.

### Endpoints

| Route                | Method | Params                                                                                                                          | Success                       | Failure                       |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------- |
| `/users/attempt`     | `POST` | ```{"email": "foo@bar.com", "password": "asecret"}```                                                                           | ```{"user": {...}}```         | ```{"error": "A message."}``` |
| `/users/{id}/exists` | `GET`  |                                                                                                                                 | ```{"exists": true\|false}``` | ```{"error": "A message."}``` |
| `/users/store`       | `POST` | ```{"name": "John Doe", "birthdate": "1990-01-01", "identity": "01234567890", "email": "foo@bar.com", "password": "johndoe"}``` | ```{"user": {...}}```         | ```{"error": "A message."}``` |
| `/users/fetch`       | `GET`  |                                                                                                                                 | ```{"users": {...}}```        | ```{"error": "A message."}``` |
