const express = require('express');
const cors = require('cors')
const app = express();

//Init Middleware
app.use(cors())
app.use(express.json({ extended: false }));
//test route
app.get('/', (req, res) => res.send('API is running'));

//Define routes

app.use('/api', require('./routes/api')); //

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
