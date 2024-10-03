# The ATM problem

Short Description
Develop the note dispenser logic of an ATM.

Details
User stories
As a user I want to be able to enter the amount I want to withdraw from the ATM (I always have enough money in my bank account)
As a user I want to see what bills the ATM gives me-if able-once I entered and submitted the desired amount
As a user I want to see an error message if the ATM is unable to give the desired amount due to the lack of appropriate bills
As an operator I want to see the withdrawal history including time, success status and amount as well as the remaining notes in the ATM
As an operator I want to be able to see and manipulate the amount of each bill in the ATM
Extra Info
This ATM is only filled with the following notes: 20000, 10000, 5000, 2000 (note there is no 1000 bill)
Frontend
Implement a frontend that is appropriate for the aforementioned user stories for both a user and operator.
The withdrawal history and the state of the notes of the ATM should be kept up to date after each action (withdrawal or note manipulation)
Also the frontend should implement the logic that decides on what notes to give if able.
Backend
-
Database
The database should store what bills the ATM has. The database of the notes should be kept up to date at all times.
Stack
Frontend: React Native + Redux
Backend: not required
Database: not restricted, but on the frontend side
