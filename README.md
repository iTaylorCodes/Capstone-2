<p align="center">
  <a href="https://itaylorcodes-neighborhoodz.surge.sh/" color="black">
    <img alt="Neighborhoodz" src="src/logos/Neighborhoodz-Logo.png" width="75" /><img alt="Neighborhoodz" src="src/logos/Neighborhoodz-Title.png" width="300" />
  </a>
</p>

[![Build Status](https://app.travis-ci.com/iTaylorCodes/Capstone-2-Neighborhood-fe.svg?branch=main)](https://app.travis-ci.com/iTaylorCodes/Capstone-2-Neighborhood-fe)
[![Coverage Status](https://coveralls.io/repos/github/iTaylorCodes/Capstone-2-Neighborhood-fe/badge.svg?branch=main)](https://coveralls.io/github/iTaylorCodes/Capstone-2-Neighborhood-fe?branch=main)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/638762e1a75140b888b09521c0491bb5)](https://www.codacy.com/gh/iTaylorCodes/Capstone-2-Neighborhood-fe/dashboard?utm_source=github.com&utm_medium=referral&utm_content=iTaylorCodes/Capstone-2-Neighborhood-fe&utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/7103b1cd632feb1f012d/maintainability)](https://codeclimate.com/github/iTaylorCodes/Capstone-2-Neighborhood-fe/maintainability)

Neighborhoodz is an application that makes it easy to discover great neighborhoods to visit. Using walkability/bike-ability/transit-rating scores from the API provided by `walkscore.com`, as well nearby hotels from the hotels API, and properties available on Zillow.

# Deployment

## Front-end

The front-end for Neighborhoodz is deployed using Surge.
You can access it at: https://itaylorcodes-neighborhoodz.surge.sh/

## Backend

The backend for Neighborhoodz is deployed using Heroku.
You can access it at: https://neighborhood-be.herokuapp.com/

The backend for Neighborhoodz handles connecting to the application database for user account functionality.

# APIs

- Google Places API (city photos): `https://maps.googleapis.com/maps/api/place/photo`
- MapQuest API (geocoding): `http://open.mapquestapi.com/geocoding/v1/address`
- Walk Score API (city scores): `https://api.walkscore.com`
- Hotels API (hotel data): `https://rapidapi.com/apidojo/api/hotels4/`

# Local Setup

If you'd like to setup a local version of Neighborhoodz, follow these steps:

## 1. Clone the respository

`$ git clone https://github.com/iTaylorCodes/Capstone-2-Neighborhood-fe.git`

`$ cd capstone-2-Neighborhood-fe`

## 2. Install all requirements

`$ npm install`

## 3. Setup environment variables

Signup for each API and set their URLS and individual keys in the root .env file.

## 5. Run the server and navigate your browser to http://localhost:3000/

`npm start`

# Testing

To fully test the application, running

`$ npm test`

will test all components, api clasess, custom hooks, and middleware.

# User Flow

### - Searching: From the homepage you can perform a search for a neighborhood you'd like to know more about.

### - Neighborhood Info: From a neighborhood page you can view scores and hotels for that neighborhood, or use the navigation link to visit Zillow and view properties in that neighborhood.

### - Visit Neighborhood: From a neighborhood page you can view nearby hotels.

### - Save Hotels: Once viewing hotels for a neighborhood, a logged in user can "heart" a hotel and add it to their favorites page.

### - Signup / Login: From the signup page you can create an account and login from the login page

### - View User Profile / Delete Account: Once logged in, from the profile page you can view your account details and edit them. You can also delete your account.

# Technologies

Neighborhoodz Front-end was created using:

- React.js
- Redux
- PostgreSQL
- Jest
- Bootstrap
- React-Router v6
- Axios
- Lodash
