# Checkin Service

This is a simple checkin service written with Flask. It handles the actions related to checkin resources.

Runs on `localhost:8042` and `172.10.10.42:80`.


### Endpoints

| Route      | Method | Params                                                                        | Success                 | Failure                       |
| ---------- | ------ | ----------------------------------------------------------------------------- | ----------------------- | ----------------------------- |
| `/api/checkin` | `POST` | ```{"user_id": "1", "event_id": "1"}```                                       | ```{"success": true}``` | ```{"error": "A message."}``` |
| `/api/checkin` | `POST` | ```{"event_id": "1", "identity": "00000000000", "birthdate": "0000-00-00"}``` | ```{"success": true}``` | ```{"error": "A message."}``` |
