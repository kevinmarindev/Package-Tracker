# Package-Tracker
Full Stack React Parcel Tracking app. This app allows you to store all your tracking numbers and track them all in one place regardless of carrier. Supports USPS, UPS and FEDEX

[Live Link](https://package-tracker-us.herokuapp.com/)

![Image](https://res.cloudinary.com/dpivoqpxh/image/upload/v1650424381/package_pyvzxv.png)


## How It's Made:

**Tech used:** React, SASS, React-Bootstrap, Express, MongoDB (Mongoose), Passport.js

This app uses react along with React-bootstrap to create a modern an respososive Front-end. React-Router-Dom is used to allow the user to navigate throught pages. It connects to the Backend and fetches from the Tracking API using Axios. Calls to the external api are made from the backend and then data is sent to the client-side for consumption. MongoDB is used to store 
the users' tracking numbers along with a status code. Passport.js allowed me to implement a local authentication strategy. Form Validation is done both on the cient side as well as backend.

