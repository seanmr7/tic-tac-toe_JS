This is a simple two player tic-tac-toe game run using Javascript, html, and CSS. The project is part of TheOdinProject curriculum, linked below. 

The main learning goal for this project was to keep the global code as clean as possible. I did this by creating two modules and a factory function. One module controls the games board and the other runs the game of tic-tac-toe. The factory-function creates players.

The most difficult parts of this project for me were figuring out where to put certain functions. For example, I at one point made a whole module to manipulate the DOM and scrapped the idea when it would require revealing too many private functions from other modules. The other difficulty I had was at the start of the project I could not figure out how to access functions from other modules. I had to go into the console and play around with it until I got the syntax for calling functions correct.

One improvement for my project could be to create a third module called "RuleSet" and move the rules related functions from PlayGame to RuleSet. This would trim down the PlayGame module and make it more focused on only starting the game, taking turns, and manipulating the DOM.

Odin Project Link: https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/javascript/lessons/tic-tac-toe-javascript