# Heroku-Angular-Node-Boilerplate

Boilerplate project for a full-stack application that can quickly be deployed to Heroku. Feel free to clone or fork, any feedback is also greatly appreciated!

## Getting Started

##### Prerequisites

*Note: These are the technologies and versions I have used at time of creating this repo*

You'll need to install some initial technologies to ensure you can succesfully get the project up and running:

- Node v8.9.3
- npm v5.5.1
- Angular CLI v1.7.1
- Heroku CLI v6.15.26 (can be easily installed via brew: `brew install heroku/brew/heroku`)
- PostgreSQL v9.5

Firstly, you'll need to clone the repo down. Once you have pulled it down, run the following:

```
$ cd heroku-angular-node-boilerplate

$ npm install
```

This should install all of the dependencies located in `package.json`. This includes things like Express, Knex and PostgreSQL connection client for Node.

Next, you'll want to create a new local PostgreSQL database which can be easily achieved within the PG CLI by executing the following:

```
$ psql

$ CREATE DATABASE boilerplate_sample_database;
```

`psql` gets you into the PG CLI tool, it allows you to execute SQL statements. Logs in as the default user but you can specify using `psql -u <USERNAME>`.

Next, update your `knexfile.js` in the root of the project within the `development` object, replace the `<YOUR_DATABASE_USERNAME>` with your local database username and do the same for the password. Ideally, you should store these in environment variables as credentials should never be stored in the code base.

Finally, give it a quick test locally by running:

```
$ knex migrate:latest

$ npm run start-dev
```

This will build your Angular app and Node will serve it on `https://localhost:8080` - navigate to your browser and verify!

#### Deploying to Heroku

To quickly deploy to Heroku, simply navigate to the root directory of the project and execute the following:

```
$ heroku login

$ heroku create

$ git push heroku master

$ heroku open
```

But wait - I'm getting an error that I haven't connected the database?

Yep, so you'll need to provision your database on Heroku, which again is really simple via the Heroku CLI:

*Note: you might need to specify the particular Heroku application you want to apply these changes to, this can simply be achieved by adding the flag `--app <YOUR_HEROKU_APP_NAME_HERE>` to the end of the commands*

```
$ heroku addons:create heroku-postgresql:hobby-dev

$ heroku run knex migrate:latest

$ git push heroku master

$ heroku open
```

Now, you should see a list of popular technologies on your view! These are being pulled from your database and pushed through your Angular application to the view!

That's pretty much it!

## Heroku

Only thing that hasn't really been touched in the setup is the `Procfile` located in the root directory. This is specific to Heroku and essentially tells the Heroku dyno what command to execute to actually spin up the application once it has been deployed - so in our case, `node server.js`.

During the setup, we utilise Heroku's feature of _addons_. We run the command:

```
$ heroku addons:create heroku-postgresql:hobby-dev
```

This uses Heroku's addon marketplace to install the PostgreSQL plugin to your application. Finally, we specify which tier we want to use - in this case `hobby-dev` which is the free tier.

Heroku's free tier gives the perfect amount for MVP applications - the only downside is that it spins down the service after a period of inactivity. Basically, this just means that once the dyno spins down and sleeps, it takes slightly longer than usual the next time someone hits the application.

Heroku also has some nice Github integration too, which allows you to setup automatic deploys whenever something has been merged into a branch e.g. master. This elimates the need to run `git push heroku master` everytime you want to re-deploy the app - _continuous development_ 👍

## Knex & Database

We use Knex to perform all of the heavy lifting with the SQL queries. It also handles DB migrations too - a super helpful feature that makes it easy to alter the schema.

Running the `knex migrate:latest` runs the DB migrations locally against your database that you have specified in the `knexfile.js`. Migrations can easily be rolled back by executing `knex migrate:rollback` - which is super useful!

All of this migration functionality can also be ran on Heroku - as you seen earlier when setting it up.
