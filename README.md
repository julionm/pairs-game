# Goals

- I want to implement tests
- I want to use tailwind the best way
- I want it to be fun
- I want it to look good
- I want it to work on mobile devices
- I want to use animations for the html components


## Objective

- Create a game where you need to find the pairs
- All pairs are randomly mixed in a board and you need to find all of them
  - Maybe create a timer to do this...
- At first it'll use something simple, like letters or numbers

## PairsGame

Define an array with Pairs and try to find all pairs.

ALL VALUES IN THE PAIRS ARRAY **MUST** BE UNIQUE!
- not anymore, as each value has a different id now we may have a lot of different value types


## Next Steps

- [ ] improve grid system of board
- [x] allow unselecting cards in Pairs Game
- [ ] add a timer to the game
- [ ] add counting of miss and hits
- [ ] maybe add a home screen
   -  no actual need for login
   -  allow game selection
   -  create a about page that shows information about me
- [ ] add a dark mode
- [ ] add animation when the user selects a pair correctly
- [ ] create other games that use the same logic (maybe something like conexo)
  - the idea here is to show that my components are reusable enough
- [ ] you win animation - ONGOING
- [x] allow different values for pairs such as: images, letters from other alphabets, maybe even expressions
  - now I'm using ids to identify each value so this will work in the future
- [ ] make the Pairs Game work for mobile (check how Conexo does this)