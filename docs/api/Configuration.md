# Configuration parameters

| Parameter                   | Description                                                                                             | Default value |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | ------------- |
| [callback](#callback)       | Custom function to interact directly with internal Expressjs app                                        | /             |
| [get](#get)                 | Custom Expressjs app `get` handlers array. Every handler is composed by a path and a callback function  | []            |
| [middlewares](#middlewares) | Custom middlewares function loaded into the Express app                                                 | []            |
| [onListen](#onlisten)       | Custom function called everytime the backend app is listening for incoming requests                     | /             |
| [port](#port)               | Custom Expressjs app listening port                                                                     | 3000          |
| [post](#post)               | Custom Expressjs app `post` handlers array. Every handler is composed by a path and a callback function | []            |
| [routers](#routers)         | Custom Expressjs app `routers` array. Every handler is composed by a path and a Router                  | []            |

## callback

Custom function to interact directly with internal Expressjs app

## get

Custom Expressjs app `get` handlers array. Every handler is composed by a path and a callback function

## middlewares

Custom Expressjs app middlewares function loaded into the Express app

## onListen

Custom function called everytime the backend app is listening for incoming requests

## port

Custom Expressjs app listening port

## post

Custom Expressjs app `post` handlers array. Every handler is composed by a path and a callback function

## routers

Custom Expressjs app `routers` array. Every handler is composed by a path and a Router
