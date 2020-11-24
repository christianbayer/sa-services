# Subscriptions Service

This is a simple subscriptions service written in Node with Express. It handles the actions related to subscriptions resources.

### Endpoints

| Route                   | Method | Params                                                                                                                          | Success                       | Failure                       |
| ----------------------- | ------ | --------------------------------------- | ----------------------- | ----------------------------- |
| `/subscriptions/list`   | `GET`  |                                         | ```{"users": {...}}```  | ```{"error": "A message."}``` |
| `/subscriptions/create` | `POST` | ```{"event_id": "1", "user_id": "1"}``` | ```{"success": true}``` | ```{"error": "A message."}``` |
| `/subscriptions/delete` | `POST` | ```{"event_id": "1", "user_id": "1"}``` | ```{"success": true}``` | ```{"error": "A message."}``` |
