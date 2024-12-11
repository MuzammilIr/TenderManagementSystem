const express = require('express');
const connectDB = require('./config/db');
const tendersRoute = require('./routes/tenders');
const userRoute = require('./routes/user'); // Import the user routes
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./routes/auth')

const app = express();

require('dotenv').config();



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to database
connectDB();

// Routes
app.use( tendersRoute);
app.use('/api/users', userRoute); // Use the user routes
app.use('/api/users', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

