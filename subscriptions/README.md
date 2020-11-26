# Subscriptions Service

This is a simple subscriptions service written in Node with Express. It handles the actions related to subscriptions resources.

Runs on `localhost:8040` and `172.10.10.40:80`.


### Endpoints

| Route                       | Method | Params                                                                                                                          | Success                       | Failure                       |
| --------------------------- | ------ | --------------------------------------- | ----------------------- | ----------------------------- |
| `/api/subscriptions/list`   | `GET`  |                                         | ```{"users": {...}}```  | ```{"error": "A message."}``` |
| `/api/subscriptions/create` | `POST` | ```{"event_id": "1", "user_id": "1"}``` | ```{"success": true}``` | ```{"error": "A message."}``` |
| `/api/subscriptions/delete` | `POST` | ```{"event_id": "1", "user_id": "1"}``` | ```{"success": true}``` | ```{"error": "A message."}``` |
