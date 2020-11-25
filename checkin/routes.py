from controllers.checkin import CheckinController

def create_routes(api):
    api.add_resource(CheckinController, '/api/checkin')
