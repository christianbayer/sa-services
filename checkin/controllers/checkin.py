from flask import Response, request, jsonify
from flask_restful import Resource
import requests
from models.subscriptions import Subscriptions
import datetime

class CheckinController(Resource):
    def post(self) -> Response:

        data = request.get_json()

        userId = data.get('user_id')
        eventId = data.get('event_id')

        if userId is None:
            try:
                # Create the user
                params = {'identity': data.get('identity'), 'birthdate': data.get('birthdate')}
                headers = {'Content-type': 'application/json', 'Accept-type': 'application/json'}
                r = requests.post(url='http://172.10.10.20/public/users/store', json=params, headers=headers)
                userId = r.json()['user']['id']

                # Create the subscription
                params = {'event_id': eventId, 'user_id': userId}
                r = requests.post(url='http://172.10.10.40/subscriptions/create', json=params, headers=headers)
            except:
                response = jsonify({'error': "There was an error!"})
                response.status_code = 500
                return response

        try:
            subscription = Subscriptions.objects(user_id=userId, event_id=eventId, unsubscribed_at=None).first()
            subscription.update(checkin_at=datetime.datetime.now())

        except Subscriptions.DoesNotExist:
            response = jsonify({'error': "This subscription does not exists!"})
            response.status_code = 400
            return response

        return jsonify({'success': True})