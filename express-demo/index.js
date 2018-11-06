const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'}
];

app.get('/', (req, res) => {
    res.send('Hello world!!!');
})

app.get('/api/courses', (req, res) =>{
    res.send(courses);
})

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);    // if invalid, return 400 - bad request
  
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));    //look up the course
    if(!course) return res.status(404).send('The course with the given id was not found');  //if not existing, return 404

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);  // if invalid, return 400 - bad request

    course.name = req.body.name;    //update course
    res.send(course);   //return the updated course
});

app.delete('/api/courses/:id', (req, res) =>{
    const course =  courses.find(c => c.id === parseInt(req.params.id));    //look up the course
    if(!course) return res.status(404).send('The course with the given id was not found');  //if not existing, return 404

    const index = courses.indexOf(course);  //if course exists, delete it
    courses.splice(index, 1);
    
    res.send(course);   //return the same course
})








function validateCourse(course){        //function that checks to see if given course is in the database
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);          
}









console.log(courses.length)
app.get('/api/courses/:id', (req, res) =>{
    console.log(req.params)
   const course =  courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given id was not found');
   res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () =>{console.log(`listening to you on port ${port}`)});