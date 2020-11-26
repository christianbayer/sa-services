# Events Service

This is a simple events service written with Laravel. It handles the actions related to events resources.

Runs on `localhost:8030` and `172.10.10.30:80`.


### Endpoints

| Route                     | Method | Params | Success                       | Failure                       |
| ------------------------- | ------ | ------ | ----------------------------- | ----------------------------- |
| `/api/events/index`       | `GET`  |        | ```{"events": {...}}```       | ```{"error": "A message."}``` |
| `/api/events/{id}/exists` | `GET`  |        | ```{"exists": true\|false}``` | ```{"error": "A message."}``` |
| `/api/events/fetch`       | `GET`  |        | ```{"events": {...}}```       | ```{"error": "A message."}``` |
