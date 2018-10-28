const EventEmmiter = require('events');
const emmiter = new EventEmmiter;

//add eventlistener to the messageLogged event
emmiter.on('messageLogged', (eArg) => {
    console.log('listener called', eArg)
});



//raise: logging (data: message)
const log = require('./logger');
log('message')