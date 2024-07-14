const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const pokemonsRoute = require('./routes/pokemon');
const userRoute = require('./routes/user'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb://localhost:27017';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api/pokemons', pokemonsRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
