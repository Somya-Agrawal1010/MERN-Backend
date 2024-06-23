const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 4000

const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { JWT_SECRET } = require('./config');
const { MONGODB_URL } = require('./config');

// Middleware




 // Add this middleware first
 app.use(cors({
  origin:["http://localhost:3000" , "http://social-media-app.onrender.com"]}
 ))


app.use(express.json()); // Add this middleware to parse JSON in the request body


global.__basedir = __dirname;
mongoose.connect(MONGODB_URL);
 

mongoose.connection.on('connected', () => {
  console.log("DB connected");
});
mongoose.connection.on('error', (error) => {
  console.log("Error connecting to DB:", error);
});

// Models and Routes
require('./model/user_model');
require('./model/post_model');

app.use('/api', require('./routes/user_route')); // Use '/api' prefix for your routes
app.use('/api', require('./routes/post_route'));
app.use('/api' , require('./routes/file_route'));-

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








