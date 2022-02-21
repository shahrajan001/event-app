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
    const temp = new Date( event.time * 1000);
    event.time = temp.toLocaleString()

    console.log(Date.now())
    await event.save();
    console.log(event)
    try {
        await event.save();
        res.status(201).send("Event added");
    } catch (e) {
        res.status(400).send("Failed to create Event");
    }
}

const listEvents = async (req, res) => {
    console.log('into list Event router')
    try {
            // console.log(req.user)
            await req.user.populate({
                path: "events",
                });
                console.log('hmmmmmm')
            res.status(200).send(req.user.events);
        } catch {
            res.status(500).send("Error getiing events");
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

    const title = req.body.title

    try {
        const task = await Task.findOne({ title});

        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.send(task);
    } catch (e) {
        res.status(400).send("Error updating task");
    }

}

const deleteEvent = async (req, res) => {
    const title = req.body.title
    try {
        const task = await Task.findOneAndDelete({title});
        if (!task) {
            res.status(404).send("Task not found");
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
