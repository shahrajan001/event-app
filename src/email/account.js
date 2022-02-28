const sgMail = require("@sendgrid/mail");
const { job } = require("cron");
const { send } = require("express/lib/response");

const sendGridAPIkey = process.env.SENDGRID_API_KEY;


var CronJob = require('cron').CronJob;
sgMail.setApiKey(sendGridAPIkey);

const schedule = require('node-schedule');

const welcomeUser = (email, name) => {
    sgMail.send({
        to: email,
        from: "shahrajan7621@gmail.com",
        subject: "Welcome to event app",
        text: `GREETINGS FOR THE DAY, ${name}. Welcome to event app. Please reply to this email for any queries.`,       
    });
}

const deleteUser = (email, name) => {
    sgMail.send({
        to: email,
        from: "shahrajan7621@gmail.com",
        subject: "We are sad to let you go",
        text: `What went wrong? ${name}. We want to you be back. We promise to make things right.`, 
    });
};

const inviteUser = (event,emailList) => {
    
    // sgMail.send({
    //     to: emailList,
    //     from: "shahrajan7621@gmail.com",
    //     subject: `Invitation for ${event.title}`,
    //     html: `<h2>Greetings for the day!</h2> </n><h6>You have been invited to a meeting has been for ${event.title} scheduled at ${event.time}. <br>Please respond with yes or no. We will remind you again at ${Date(event.time-333000)}`,
    // });
    console.log('invites sent')
};

const remindUser = (event,emailList) => {
    schedule.scheduleJob(event.time -333000,()=>{
        sgMail.send({
            to: emailList,
            from: "shahrajan7621@gmail.com",
            subject: "Your Meeting starts in 5 minutes",
            text: `Your meeting has been scheduled to start in 5 minutes, it is advisable for you to log into your account`,
        });})
        console.log('reminders sent')
    };
        
const remindUser1 = async (emailList) => {

    const Events = require('../models/event')
    const events = await Events.find();

    const reminderEvents = events.map(event => ({_id: event._id, time: event.time,emailList:event.emailList}))
    // console.log(events)
    const job = new CronJob(' * * * * * *', ()=>{
        console.log("differenceTime")
        const differenceTime = events.time-Date.now()
        console.log(differenceTime)
    //     for(let i = 0; i < generateEvents.length; i++){
    //         const differenceTime = reminderEvents.time-Date.now()
    //         console.log(differenceTime)
    // }
    console.log(differenceTime)
        if(332000 < (differenceTime) && (differenceTime) < 333000){            
            console.log('about to send reminder')
            console.log(event.time-Date.now())
            g
            // sgMail.send({
            //     to: emailList,
            //     from: "shahrajan7621@gmail.com",
            //     subject: "Your Meeting starts in 5 minutes",
            //     text: `Your meeting has been scheduled to start in 5 minutes, it is advisable for you to log into your account`,
            // })
        
        // })
        }
        })
        job.start();
    }
const generateEvents = async () =>{
    console.log("events")
    const Events = require('../models/event')
    const events = await Events.find();
    
    // const reminderEvents = events.map(event => ({_id: event._id, time: event.time,emailList:event.emailList}))
    // return (reminderEvents)
    console.log(events)
    return events
}

module.exports = {
    welcomeUser,
    deleteUser,
    inviteUser,
    remindUser,
    remindUser1,
};

