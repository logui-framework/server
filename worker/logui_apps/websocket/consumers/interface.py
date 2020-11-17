from channels.generic.websocket import WebsocketConsumer

class InterfaceConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
    
    def disconnect(self, close_mode):
        pass
    
    def receive(self, text_data):
        print(text_data)

        self.send(text_data='interface consumer')