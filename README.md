# Qwirkle

## Table of Contents
[Running the Project](#running-the-project)

[How to Play Qwirkle](#how-to-play-qwirkle)

## Running the project

### Installing the Python Modules

Open the [backend folder](backend) and run the command:
```
pip install -r requirements.txt
```

### Installing Libraries and Dependencies
Run the command: 
```
npm install
```
Then, also open the [frontend folder](frontend) and run the command:
```
npm install
```

### Running the Backend Server

Open the [backend folder](backend) and run the command:
```
python app.py
```

### Compiling for Development
Open the [frontend folder](frontend) and run the command:
```
npm run serve
```

## How to Play Qwirkle

On your turn, do one of three things: 
1. Add one tile to the grid, and then draw a tile to bring your hand up to six.
2. Add two or more tiles to the grid. All tiles played from your hand must share one attribute, either color or shape. Your tiles must be played in the same line, although they do not have to touch eachother. Draw tiles to bring your hand up to six.
3. Trade some or all of your tiles for different tiles.

### Adding to the Grid
Players take turns adding to the grid that is created on the first turn. All tiles must connect to the grid. Two or more tiles that touch create a line. A tile is either all one shape or all one color. Tiles that are added to a line must share the same attribute as the tiles that are already in the line. Often, there are places on the grid where no tile can be played. A line of shapes can only have one tile of each of the six colors. For example, a line of squares can have only one blue square. A line of color can only have one tile of each of the six shapes. For example, a line of yellow can only have one yellow circle. 

### Ending the Game
When there are no more tiles left to draw, play continues as before, but players do not replenish their hands at the end of their turn. The first player who uses all of their tiles ends the game and gets a six-point bonus. The player with the highest score wins! 
