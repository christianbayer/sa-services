# Events Service

This is a simple events service written with Laravel. It handles the actions related to events resources.

### Endpoints

| Route                 | Method | Params | Success                       | Failure                       |
| --------------------- | ------ | ------ | ----------------------------- | ----------------------------- |
| `/events/index`       | `GET`  |        | ```{"events": {...}}```       | ```{"error": "A message."}``` |
| `/events/{id}/exists` | `GET`  |        | ```{"exists": true\|false}``` | ```{"error": "A message."}``` |
| `/events/fetch`       | `GET`  |        | ```{"events": {...}}```       | ```{"error": "A message."}``` |
