# Rellet

A simple wallet that lets you manage your expenses and savings 👛

---
## Get Started

As pre-requirements, you will need NodeJS, NPM and MongoDB installed on your system.
With that said, go and clone this repo!

### Installation

Run the following command to get all the dependencies from the package.json that you will need

     npm install

## Configuration

### Enviromental Variables

In order to run the project you will need a _.env_ file that should look something like this

    MONGODB_URI=mongodb://localhost:27017/<YOUR_DATABASE>
    MONGODB_URI_TEST=mongodb://localhost:27017/<YOUR_TEST_DB>

This is if you want to run it locally.

### Testing the project

    npm test

### Run the project

    npm start

---
## Documentation
The RESTful API of this project was documented using Postman. Import the documentation to your postman [here](https://www.getpostman.com/collections/066bf96d9fa5527d2980).

---
## TODO
- [] Implementar balance a la hora de llamar el usuario
- [] Encriptar contraseña con AES (Moongose - moongose-encrypt)