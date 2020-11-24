from mongoengine import Document, IntField, DateTimeField

class Subscriptions(Document):
    event_id = IntField(required=False)
    user_id = IntField(required=False)
    subscribed_at = DateTimeField(required=False)
    unsubscribed_at = DateTimeField(required=False)
    checkin_at = DateTimeField(required=False)
