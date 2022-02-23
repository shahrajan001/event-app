const sgMail = require("@sendgrid/mail");

const sendGridAPIkey = process.env.SENDGRID_API_KEY;

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
    sgMail.send({
        to: emailList,
        from: "shahrajan7621@gmail.com",
        subject: `Invitation for ${event.title}`,
        html: `<h2>Greetings for the day!</h2> </n><h6>You have been invited to a meeting has been for ${event.title} scheduled at ${event.time}. <br>Please respond with yes or no. We will remind you again 5 minutes before ${event.time}`,
    });
};

const remindUser = (event,emailList) => {
    console.log(event.time -333000)
    schedule.scheduleJob(event.time -333000,()=>{
        sgMail.send({
            to: emailList,
            from: "shahrajan7621@gmail.com",
            subject: "Your Meeting starts in 5 minutes",
            text: `Your meeting has been scheduled to start in 5 minutes, it is advisable for you to log into your account`,
        });})
    };
    
module.exports = {
    welcomeUser,
    deleteUser,
    inviteUser,
    remindUser,
};

