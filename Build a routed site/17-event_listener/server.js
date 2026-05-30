import {EventEmitter} from 'node:events'
const customerDetails = {
    fullName: 'Meryl Sheep',
    email: 'baah@thedevilwearswool.com',
    phone: 12345678910
  }
//create the emitter
const eventEmitter=new EventEmitter();
//listener fucntion
function listenEmail(customer){
    console.log(customer);
}
//register the listener
eventEmitter.on('requestEmail',listenEmail)
//emit the event
eventEmitter.emit('requestEmail',customerDetails)