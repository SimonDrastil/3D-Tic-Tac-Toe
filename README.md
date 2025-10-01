Overview

This project is a web-based version of Tic-Tac-Toe with a 3D layered rule. The game starts with one 3×3 board. If it ends in a tie, a new floor is added on top. Up to three floors can be created, and players can win with lines across rows, columns, diagonals, or even through all three floors.

Problem

Normal Tic-Tac-Toe is too simple and often ends in ties. The goal was to create a more complex version that is still easy to play but offers new strategies.

Solution

Built with HTML, CSS, and JavaScript.

Floors are added automatically when ties happen.

The game checks all possible 2D and 3D winning lines.

A scoreboard tracks wins, losses, and draws.

Players can undo moves, reset, or change settings.

Works on both desktop and mobile.

Features

Layered tie system (up to 3 floors).

3D win detection (49 winning lines).

Score tracking with localStorage.

Undo last move.

Settings (first player, sounds, coordinates).

Clean dark design with animations.

Testing & Results

Correctly detects wins in 2D and 3D.

Floors lock when tied and new ones appear.

Undo system works even if a new floor was created.

Responsive on different devices.

Saves scores and settings after reload.

Conclusion

This project makes Tic-Tac-Toe more challenging and interesting. The 3D rule adds strategy, and the program is simple, polished, and fun to play.
