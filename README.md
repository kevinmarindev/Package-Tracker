# Package-Tracker
Full Stack React Parcel Tracking app. This app allows you to store tracking numbers and track packages from USPS, UPS and Fedex all in one place. 

[Live Link](https://package-tracker-us.herokuapp.com/)

![Image](https://res.cloudinary.com/dpivoqpxh/image/upload/v1650424381/package_pyvzxv.png)


## How It's Made:

**Tech used:** React, SASS, React-Bootstrap, Express, MongoDB (Mongoose), Passport.js

This app uses react along with React-bootstrap to create a modern and responsive Front-end. React-Router-Dom is used to allow the user to navigate throughout pages. It connects to the Backend and fetches from the Tracking API using Axios. 
Calls to the external api are made from the backend, then data is sent to the client-side for consumption. MongoDB is used to store the users' tracking numbers along with a status code. Passport.js allowed me to implement a local authentication strategy. Form Validation is done both on the client side as well as backend.

## Lessons Learned:

This project gave me the opportunity to experiment with the implementation of an external APIs into a project. It presented many challenges and forced me to look for packages and libraries to solve problems. It also forced me to take the time to learn a react styling library such as React-Bootstrap. Furthermore, it gave me the opportunity to better understand HTTPS and its error codes. 
