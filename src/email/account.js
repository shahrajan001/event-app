const sgMail = require("@sendgrid/mail");

const sendGridAPIkey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridAPIkey);

const welcomeUser = (email, name) => {
    sgMail.send({
        to: email,
        from: "shahrajan7621@gmail.com",
        subject: "Welcome to task app",
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

const inviteUser = (event) => {
    sgMail.send({
        to: event.emailList,
        from: "shahrajan7621@gmail.com",
        subject: `Invitation for ${event.title}`,
        text: `Greetings for the day! You have been invited to a meeting has been for ${event.title} scheduled at ${event.time}, Please respond to yes or no. We will remind you again % minutes before ${event.time}`,
    });
};

const remindUser = (emailList) => {
    sgMail.send({
        to: emailList,
        from: "shahrajan7621@gmail.com",
        subject: "Your Meeting starts in 5 minutes",
        text: `Greetings for the day! Your meeting has been scheduled to start in 5 minutes, it is advisable for you to log into your account`,
    });
};

module.exports = {
    welcomeUser,
    deleteUser,
    inviteUser,
    remindUser,
};

