# Authentication Service

This is a simple authentication service written in Go. It handles the authentication of the users with email and password.

### Endpoints

| Route    | Method | Params                                                | Success                                             | Failure                       |
| -------- | ------ | ----------------------------------------------------- | --------------------------------------------------- | ----------------------------- |
| `/login` | `POST` | ```{"email": "foo@bar.com", "password": "asecret"}``` | ```{"token": "thatlongtoken", "expires": "time"}``` | ```{"error": "A message."}``` |
