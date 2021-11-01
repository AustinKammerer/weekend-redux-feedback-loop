# PROJECT NAME

Weekend Redux Feedback Loop

## Description

_Duration: Weekend_

This weekend's objective was a full-stack multi-part feedback form using React and Redux. Instead of using local state variables for form input values, this app utilizes a Redux store for storing data globally.

Each part of the form is it's own component that dispatches it's input to a feedback state reducer. This enables the client to take all of the inputs and post them to the database from a separate component without using props.

In addition, there is an Admin view that requests all the feedback data from the database and displays it to the user. This data is also located in the Redux store. There is an option to delete individual feedback entries from the database in this view.

The biggest challenge in this project has been trying to implement a stepper for visual indication of form progress. More specifically, ensuring the stepper 'knows' which component the user is viewing, even when using the browser's 'Back' button. I've added some reducers that could potentially help with this.

Deployed version of the app can be found [here](https://gruesome-web-81167.herokuapp.com/)

TODO:

- [ ] Implement a stepper

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

If your application has secret keys (for example -- Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a database named `prime_feedback`,
2. The queries in the `data.sql` file are set up to create the necessary table and populate it with some starter images. [Postico](https://eggerapps.at/postico/) is recommended as that was used to create the queries,
3. Open up your editor of choice and run `npm install`
4. Run `npm run server` in your terminal to start the server with `nodemon`
5. Run `npm run client` in your terminal to open the client in your browser

## Usage

How does someone use this application? Tell a user story here.

1. Enter your feedback inputs and click "NEXT" in each step of the form.
2. Review your inputs. You may click categories to change your answers.
3. Submit your feedback after reviewing.
4. The survey may be repeated after successfull submission.
5. Use the [admin view](http://localhost:3000/#/admin) to view all submissions in the database.
6. Click the delete button and confirm to delete a feedback entry from the database.

## Built With

- React
- Redux
- Node.js
- Express.js
- PostgreSQL
- Material UI v5

## Acknowledgement

I would like to thank [Prime Digital Academy](www.primeacademy.io) and [Dane Smith](https://github.com/DoctorHowser)

## Support

If you have suggestions or issues, please email me at [austin4191@gmail.com](www.google.com)
