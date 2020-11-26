# Authentication Service

This is a simple authentication service written in Go. It handles the authentication of the users with email and password.

Runs on `localhost:8010` and `172.10.10.10:80`. 


### Endpoints

| Route             | Method | Params                                                | Success                                             | Failure                       |
| ----------------- | ------ | ----------------------------------------------------- | --------------------------------------------------- | ----------------------------- |
| `/api/auth/login` | `POST` | ```{"email": "foo@bar.com", "password": "asecret"}``` | ```{"token": "thatlongtoken", "expires": "time"}``` | ```{"error": "A message."}``` |
