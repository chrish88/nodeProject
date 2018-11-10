const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Comedy"},
    {id: 3, name: "Horror"},
    {id: 4, name: "Romace"}
]

//Validate Course function
function validateCourse(course){        //function that checks to see if given course is in the database
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);          
}


app.get('/vidly/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/vidly/api/genres/:id/:year/:month/:day', (req, res) => {
    console.log(req.params);
    const genre = genres.find(g => g.id === parseInt(req.params.id));    //look up the course
    if(!genre) return res.status(404).send('The course with the given id was not found');  //if not existing, return 404

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);  // if invalid, return 400 - bad request

    res.send(req.params);
});

app.post('/vidly/api/genres', (req, res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre)
});

app.put('/vidly/api/genres/:id', (req, res) => {
    
});


//we need to update and delete


const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`listening to you on port ${port}`)});