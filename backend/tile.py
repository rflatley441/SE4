from enum import Enum


class TileColor(Enum):
    def __str__(self):
        return str(self.value)

    RED = "#f00"
    ORANGE = "#f80"
    YELLOW = "#ff0"
    GREEN = "#0a0"
    BLUE = "#00f"
    PURPLE = "#a0a"


class TileShape(Enum):
    def __str__(self):
        return str(self.value)

    CIRCLE = "circle"
    CLOVER = "clover"
    DIAMOND = "diamond"
    SQUARE = "square"
    STAR_4PT = "star4pt"
    STAR_8PT = "star8pt"


class Tile:
    def __init__(self, shape, color):
        self.shape = shape
        self.color = color
        self.position = -1

    def __str__(self):
        return f'shape: {self.shape} color: {self.color} position: {self.position}'
