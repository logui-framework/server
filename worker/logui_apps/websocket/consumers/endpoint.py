from channels.generic.websocket import WebsocketConsumer

class EndpointConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
    
    def disconnect(self, close_mode):
        pass
    
    def receive(self, text_data):
        print(text_data)

        self.send(text_data='from the server, hello!')