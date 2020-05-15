# Fullstack Typescript Project Starter

A fullstack project starter for rapid product development.

## Features

- Fullstack Typescript (ts-node and tsx)
- React for frontend development
- Graphql/Apollo for data fetching and state management
- MongoDB for storage
- Styled components for design and styling
- Livereloading for both server and client
- Heroku deployment ready


## Setting up db
for session auth
```
psql mydatabase < node_modules/connect-pg-simple/table.sql
```

## Getting started

1. Install `npm install && cd src/client && npm install && cd ../../`
1. Start both the frontend and backend: `npm run dev`
1. Visit `localhost:3000`
1. For the graphql playground run `npm run server` and visit `localhost:3001/graphql`

## Export to Native App (using React Native)

_Coming soon in 2020_

## Deployment

This project is ready for deployment on Heroku. Create an account at http://heroku.com/

## Set up MongoDB

1. Verify your Heroku account by add your billing information
1. `heroku addons:create mongolab`
1. Confirm MongoDB URI is set with `heroku config:get MONGODB_URI`

## Set up application

1. Install the [heroku cli](https://devcenter.heroku.com/articles/heroku-cli)
1. `heroku create`
1. `heroku git:remote -a <app_name>`
1. `git push heroku master`
