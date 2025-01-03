import json

class Job_Bot:
    def __init__(self) -> None:
        self.config = self.read_config()

    def read_config(self):
        with open('config.json', 'r') as file:
            config = self.validate_config(json.load(file))

        return config
    
    def validate_config(config):
        
        return config
