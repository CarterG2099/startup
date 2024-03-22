# Healthy Recipes
## Elevator Pitch
Trying to eat healthier or struggling to keep all of your favorite recipes organized? Want to try your friend's favorite recipes? Introducing "Healthy Recipes". Share and try favorite recipes with those you trust and hear what they have to say about their newly discovered recipes. No longer scrolling through recipes that don't fit your diet or are too bland to even try. Keep track of your favorite recipes to make again and again to satisfy that craving for deliciousness.

## Design
![](images/home.png)
![](images/reviews.png)
![](images/signup.png)
![](images/login.png)


## Key Features
- Secure login over HTTPS
- Ability to upload recipes
- Ability to vote on recipes
- Ordering of recipes based on votes
- Reviews can be added and stored persistently
- Reviews are displayed for each recipe

## Technologies
- **HTML** - Four HTML pages, one for login, signup, reviews, and recipes. Hyperlinks connect recipes and reviews
- **CSS** - Used to display recipes and nutritional information in a simple clean format that is easily readable on multiple screen sizes.
- **JavaScript** - Provides login, choice display, applying votes, display number of votes, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - Login
  - submitting votes
  - submitting reviews
  - retrieving votes
  - submitting recipes
  - displaying recipes
- **DB/Login** - Store users, votes, and reviews in the database. Register and login users with their credentials stored securely in database. Can't vote, upload recipes, or add reviews unless authenticated.
- **WebSocket** - User-added reviews and recipes are pulled from the webserver. Votes are displayed for all users.
- **React** - Applicated ported to use the React web framework.

## HTML Deliverable
- Three HTML pages that allow for login/sign on, recipes, and reviews
- Every page has links to the other pages
- **WebSocket** - The count of votes represents the tally of realtime votes.
- Three images for Breakfast/Lunch/Dinner
- Text to display recipes/ingredients and reviews
- Recipes and reviews stored in the database and loaded

## CSS Deliverable
- **Header, footer and main content body**
- **Navigation elements** - I dropped the underlines and made them horizontal. Also changed the color
- **Responsive to window resizing** - It dynamically adjusts based on the window size
- **Application elements** - Everything is visible and follows a theme
- **Application text content** - consistent fonts and varying sizes to emphasize importance
- **Application images** - Added border to the images and made them similar in size

## JavaScript Deliverable
- **Login** - When you press the login button it takes you to the voting page.
- **Database** - Display each meal dynamically from the database and when clicking on Add Recipe it adds a new meal to the database that I will eventually turn into websocket data. Also clicking on the instructions link pops up a modal with the instructions stored in the database. Also the Reviews are dynamically loaded based on the selected meal from the database
- **Websocket** - When clicking the upVote button the votes simulate the websocket update
- **Injecting into DOM** - When the recipes and reviews load, the Recipes/reviews classes injects all of the meal data by creating HTML and inserting the data
- **Local Storage** - the username is stored in Local Storage and displayed across the pages.

## Service Deliverable
- **Node.js/Express** - done
- **Static middleware for frontend** - done
- **Calls to third party endpoints** - quote on the reviews page and random images for breakfast/lunch/dinner
- **Backend Service Endpoints** - Endpoints for recipes, placeholders for login that stores the current user on the server
- **Frontend calls service endpoints** - I did this using the fetch function

## DB/Login Deliverable
- **MongoDB Atla database created** - done
- **Stores data in MongoDB** - done
- **User Registration** - Creates a new account in the database
- **Existing User** - Allows for existing user to login
- **Use MongoDB to store credentials** Stores both user and recipes
- **Restricts Functionality** - You cannot add a recipe until logged in

## WebSocket Deliverable

## React Deliverable

## Reference notes at [Notes](https://github.com/CarterG2099/startup/blob/main/notes.md)
