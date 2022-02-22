const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const Event = require("../models/event");

const addEvent = async (req, res) => {
    console.log("into add event router")
    const event = new Event({
        ...req.body,
        creator: req.user._id,
    });

    //-------------------------time conversion------------------------
    const temp = new Date( event.time * 1000);
    event.time = temp.toLocaleString()
    await event.save();

    const temp1 = new Date.now()
    






    //-----------------------logic--------------------------
    try {
        await event.save();
        res.status(201).send("Event added");
    } catch (e) {
        res.status(400).send("Failed to create Event");
    }
}

const listEvents = async (req, res) => {
    try {   
            await req.user.populate("events")
                console.log('hmmmmmm')
            res.status(200).send(req.user.events);
        } catch(e) {
            res.status(500).send(e);
        }
    }

const updateEvent = async (req, res) => {
    console.log('into update Event router')
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
        console.log(event)
        updates.forEach((update) => (event[update] = req.body[update]));
        await event.save();

        console.log('into update Event router-2')
        if (!event) {
            return res.status(404).send("Event not found");
        }
        res.send(event);
    } catch (e) {
        res.status(400).send("Error updating task");
    }
}

const deleteEvent = async (req, res) => {
    console.log('into delete Event router')
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
