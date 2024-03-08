class Settings: 
    def __init__(self, audio, animations, color_blind_mode):
        self.audio = audio
        self.animations = animations
        self.color_blind_mode = color_blind_mode

    def toggleAudio(self):
        return not self.audio
    
    def toggleAnimations(self):
        return not self.animations     
    
    def toggleColorBlindMode(self):
        return not self.color_blind_mode