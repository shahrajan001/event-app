const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtsecret = process.env.JWT_SECRET
const Event = require("./event");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, 
            trim: true, 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true, 
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email");
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
//----------addin virtual attriutes-----------
userSchema.virtual("events", {
    ref: "Events",  
    localField: "_id",
    foreignField: "creator",
});

//----------hiding data------
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};
//-------token generation---------
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },jwtsecret); //expiresIn is optional
    user.tokens = user.tokens.concat({ token });
    user.save();
    return token;
};

//----------------log in part-----------
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && !user) {
        throw new Error("Unable to login...");
    }
    return user;
};

//------------hashing the password------------
userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

//---------delete tasks of a deleted user
userSchema.pre("remove", async function (next) {
    await Event.deleteMany({ creator: this._id });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
