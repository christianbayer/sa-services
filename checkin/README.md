# Checkin Service

This is a simple checkin service written with Flask. It handles the actions related to checkin resources.

### Endpoints

| Route      | Method | Params                                                                        | Success                 | Failure                       |
| ---------- | ------ | ----------------------------------------------------------------------------- | ----------------------- | ----------------------------- |
| `/checkin` | `POST` | ```{"user_id": "1", "event_id": "1"}```                                       | ```{"success": true}``` | ```{"error": "A message."}``` |
| `/checkin` | `POST` | ```{"event_id": "1", "identity": "00000000000", "birthdate": "0000-00-00"}``` | ```{"success": true}``` | ```{"error": "A message."}``` |
