from enum import Enum


class TileColor(Enum):
    RED = 1
    ORANGE = 2
    YELLOW = 3
    GREEN = 4
    BLUE = 5
    PURPLE = 6


class TileShape(Enum):
    CIRCLE = 1
    CLOVER = 2
    DIAMOND = 3
    SQUARE = 4
    STAR_4PT = 5
    STAR_8PT = 6


class Tile:
    def __init__(self, shape, color):
        self.shape = shape
        self.color = color
