require("dotenv").config();
const app = express();

const port = process.env.APP_PORT ?? 5001;
const express = require("express");
const jwt = require("jsonwebtoken");
const userHandlers = require("./userHandlers");
const userHandlers = require("./userHandlers");
const { hashPassword, verifyPassword } = require("./auth");
const {hashPassword, verifyToken} = require("./auth.js");

const movieHandlers = require("./movieHandlers");



const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};


app.use(express.json());

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.use(verifyToken); 
app.post("/api/login", isItDwight);
app.post("/api/users", userHandlers.postUser);
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/login",userHandlers.getUserByEmailWithPasswordAndPassToNext,verifyPassword);
app.post("/api/users", hashPassword, userHandlers.postUser);
app.post("/api/movies", verifyToken, movieHandlers.postMovie);

app.put("/api/users/:id", userHandlers.updateUser);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/movies/:id", verifyToken, movieHandlers.updateMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/movies/:id", verifyToken, movieHandlers.deleteMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }

const isItDwight = (req, res) => {
  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};

const verifyPassword = (req, res) => {
argon2
.verify(req.user.hashedPassword, req.body.password)
.then((isVerified) => {
  if (isVerified) {
   const payload = { sub: req.user.id };

   const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
       });
 
      delete req.user.hashedPassword;
      res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
     }
      })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
     });
  };

});
