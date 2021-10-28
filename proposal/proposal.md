# Capstone Guidelines

## 1. What tech stack will you use for your final project?

This project will have a React/Redux front-end, a Node/Express back-end, and a PostgreSQL database. The routing will be done client-side using the React Router library.

---

## 2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?

The React front-end will be the primary focus of the project. The back-end will be focused on handling communication with the database of users.

---

## 3. Will this be a website? A mobile app? Something else?

This project will be a web app.

---

## 4. What goal will your project be designed to achieve?

This project will be designed to help users select neighborhoods to live in and find houses for sale in those neighborhoods.

---

## 5. What kind of users will visit your app? In other words, what is the demographic of your users?

The target demographic for this project is anyone looking for information on neighborhoods or real estate properties.

---

## 6. What data do you plan on using? How are you planning on collecting your data?

This project will pull neighborhood scores from `walkscore.com's` API as well as real estate information from the `zillow.com` API hosted on `rapidapi.com`. It will also have a database with tables of users and favorited properties.

---

## 7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:

- **What does your database schema look like?**

  This project's database schema will have two tables. One for users, with columns: id, username, password, and email. The second a favorite_properties table with columns: user_id (referencing the id from the users table), and property_zpid (a unique property id that will come from zillows API).

<p>&nbsp;</p>

- **What kinds of issues might you run into with your API?**

  The walkscore API is limited to only show scores on the free tier. If I want to display information about those scores I will have to look for another API. The zillow API requires a special `zpid` parameter for each property so it will require an extra API call to find the properties `zpid` number.

<p>&nbsp;</p>

- **Is there any sensitive information you need to secure?**

  User passwords will be encrypted.

<p>&nbsp;</p>

- **What functionality will your app include?**

  - User signup
  - User login
  - Edit User profile
  - Delete User profile
  - Lookup scores on any neighborhood
  - Lookup properties for sale based on search criteria
  - Save properties to a favorites list

<p>&nbsp;</p>

- **What will the user flow look like?**

  _Users will not have to login for these functions_

  - Users can search for a neighborhood and view its walkability scores.
  - They can then view properties for sale in that neighborhood.
  - They can specify properties to show based on type of property, number of bedrooms/bathrooms, and price range.

  _These functions will require login_

  - Users will signup.
  - They will log in.
  - If users want to save a property, once logged in, they can add it to their favorites list.
  - They can view their favorited properties from their favorites page.
  - They can edit or delete their profile from their profile page.
  - They can log out from the navbar.

<p>&nbsp;</p>

- **What features make your site more than CRUD? Do you have any stretch goals?**

  Stretch goals include:

  - Integrate a CICD pipeline
  - Code quality and maintainability integration
  - Deploy the application using Heroku
  - All code well tested, with a coverage score as high as possible
  - Hoping to include the function for a user to click on the email address of a property seller to route the user to their default email client with the sellers email address inserted into the "To:" section
