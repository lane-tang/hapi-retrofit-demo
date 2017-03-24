# A Simple REST Server based on hapi


Here is a simple REST( Representational State Transfer ) Server, using hapi framework on Node.js.

This mini Project is a server side code for the video : [Send Objects In Request Body](https://www.youtube.com/watch?v=j7lRiTJ_-cI).


## Dependencies
You need the following tools installed on your computer to  run the code:
- Node.js
- npm
- MongoDB


## Setup
To set up the required environment, just clone this repository to your local machine and install the npm dependencies.
```
$ git clone https://github.com/behindtheshadow/a-server-side-code-for-retrofit-push-demo.git
$ cd a-server-side-code-for-retrofit-push-demo
$ npm install -save
```


## Run
You need first run MongoDB Server on your computer :
```
$ mongod
```
Then, open another terminal and run :
```
node server
```
You can test the server using postman chrome extension at address `http://localhost:3000/api/user` 

If you are using Android Emulator to POST some json data, please be sure using the IP address `10.0.2.2` rather than `localhost`

---
I,m glad to to help you guys!