const express = require("express");

const User = require("../models/user");
const User1 = require("../models/user");
const Event = require("../models/event");
const emails = require("../email/account");

const addEvent = async (req, res) => {
    console.log("into add event router")
    const event = new Event({
        ...req.body,
        creator: req.user._id,
    });
    console.log(event)
    try {
        await event.save();
        const invitations = event.emailList      
        const invitesToSend = await User.find({_id : invitations})
        const inviteEmails = invitesToSend.map(({ email }) => email)
        
        const accepted = event.acceptedList
        const remindersToSend = await User.find({_id : accepted})
        const remindEmails = remindersToSend.map(({ email }) => email)
        emails.inviteUser(event,inviteEmails);
        emails.remindUser1(event,remindEmails);
        // // add emails.remindUser as well
        res.status(201).send("Event added");
    } catch (e) {
        res.status(400).send(e);
    }
    
}

const listEvents = async (req, res) => {
    try {   
            await req.user.populate("events")
            res.status(200).send(req.user.events);
        } catch(e) {
            res.status(500).send(e);
        }
    }

const updateEvent = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "time"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid update" });
    }

    const titlet = req.body.title
   
    try {
        const event = await Event.findOne({ title:titlet,creator:req.user._id});
        updates.forEach((update) => (event[update] = req.body[update]));
        await event.save();

        if (!event) {
            return res.status(404).send("Event not found");
        }
        res.send(event);
    } catch (e) {
        res.status(400).send("Error updating task");
    }
}

const deleteEvent = async (req, res) => {
    const title = req.body.title
    try {
        const event = await Event.findOneAndDelete({title,creator:req.user._id});
        if (!event) {
            res.status(404).send("Event not found");
        }
        res.send();
    } catch (e) {
        res.status(500).send(e.toString());
    }
}

module.exports = {
    addEvent,
    listEvents,
    updateEvent,
    deleteEvent,
};
