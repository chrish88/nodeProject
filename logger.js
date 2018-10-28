
const EventEmmiter = require('events');
const emmiter = new EventEmmiter;

var url = 'http://mylogger.io/log';

function log(message){
    //send an http request
    console.log(message);

    //trigger event named 'messageLogged'
    emmiter.emit('messageLogged', {
        id: 1,
        url: 'http://'
    });
}

module.exports = log;