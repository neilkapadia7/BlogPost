const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => 
    res.json({ msg: 'Welcome to the BlogPost API'})
);

// Routes 
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server has started on Port Number ${port}`))