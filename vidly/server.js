const Joi = ('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Comedy"},
    {id: 3, name: "Horror"},
    {id: 4, name: "Romace"}
]

app.get('/vidly/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/vidly/api/genres', (req, res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre)
});


//we need to update and delete


const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`listening to you on port ${port}`)});