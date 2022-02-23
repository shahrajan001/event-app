const express = require("express");
const { update } = require("../models/user");
const {req,res} = require("express/lib/response");

const User = require("../models/user");
const emails = require("../email/account");

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        emails.welcomeUser(user.email, user.name);
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (e) {
        res.status(400).send("Error logging you in");
    }
}

const userDetails = async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send("Error fetching details");
    }
}

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid update" });
    }
    const _id = req.user._id;
    
    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send("Error updating details");
    }

}

const userEvents = async (req, res) => {                //wont be using 20220221 13:18

}

const uploadAvatar = async (req, res) => {
    
}

const viewAvatar = async (req, res) => {
    
}

const deleteAvatar = async (req, res) => {
    
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send("logged out");
    } catch (e) {
        res.status(500).send("Error logging you out ");
    }
    
}

const logoutAll = async (req, res) => {

    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send("logged out of all devices");
    } catch (e) {
        res.status(500).send("Error logging out");
    }
}

const deleteUser = async (req, res) => {
    const _id = req.user._id;
    try {
        const user = await User.findByIdAndDelete(_id);
        await req.user.remove();
        emails.deleteUser(user.email, user.name);
        res.send("user removed");
    } catch (e) {
        res.status(500).send("Error deleting your account");
    }
}

module.exports = {
    createUser,
    loginUser,
    userDetails,
    updateUser,
    userEvents,
    uploadAvatar,
    viewAvatar,
    deleteAvatar,
    logout,
    logoutAll,
    deleteUser,

}