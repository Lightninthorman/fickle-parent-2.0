# fickle-parent-2.0

## The App

[The Fickle Parent](https://fickle-parent.herokuapp.com/)

### Project

The Fickle Parent was the final project for my 3 month coding bootcamp. I built the app in about 10 days, which is an approximation because Christmas occurred during the project timeline and just sent my usual schedule into chaos. What great timing then to be creating an app to help rank my kids... more on that in a minute.

I created a backend API for my Postgres data and made calls to the API from my React app, which is a separate project from the backend. This was easier for me to work on and keep organized.

Back-End GitHub: [The Fickle Parent Back-End](https://github.com/Lightninthorman/fickle-parent-backend)

I built the app with the following tools that we learned in the bootcamp:
* React
* Apache
* PostgreSQL

Additional tools that I learned for this project:
* React Router - discussed in class, but my project required a deeper dive
* Firebase Authentication
* Chart.js
* SendGrid - for sending emails from a Heroku hosted site

### The Idea

First off, it's a terrible idea, I know that, but it is darkly funny to me, which is a great motivator.
That being said, this is an app that allows parents to keep a journal about each child and then rate their child for that day based on 5 categories. The data is then used to create charts comparing all children, and to create charts for each child. You have the option to send an email to each child telling them their rank and where they need to improve the most.

### The Code

The front end is built using Create-React-App to, well, create a React app. I used Firebase Authentication to sign up users and have users log in.
Once logged in a request is made to the API using the unique userID created by Firebase to find all the child data associated with that user.

I built the API to match my needs, which includes sending all the child data back for all requests including POST, PUT, and DELETE. This means I don't have to make a GET request again whenever I update the database as the most recent data is always sent back.

All the components are kept in the main App.js component, which allows for React Router to create links to the different pages. I had created multiple routers on various pages, but eventually found that I needed data from different areas, and ultimately the only place where they shared the same state to transfer data to each other was from App.js. So much for getting overly fancy.

Through various methods of looping and sorting I created several variables containing the rating data for the children, each for different purposes like populating the comparison graphs, creating the gauge charts, populating individual child charts for their specific chart pages, and providing the necessary data for the email.

I found that Heroku requires you to use a plugin of your choosing to send emails from the site. I chose to use SendGrid simply because I found the basics easy enough to understand. While I would like to have the email provide more information like the actual charts for the child I ran out of time to learn that before the project was due, and it seems that the complexity of making that possible was exponential compared to what I currently have. 
