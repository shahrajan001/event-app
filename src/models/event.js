const mongoose = require("mongoose");
const validator = require("validator");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required:true,
            // unique: true,
            trim: true,
        },
        time: {
            type:Date,
            required: true,
            // default: Date.now()+5,
            // unique:true
            validate(value) {
                if (value < Date.now()) {
                    throw new Error("You cannot set an even for the past");
                }
            },
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        emailList: [
            {
                type: String,
                unique:true,
                // required: true,
                validate(value) {
                    if (!validator.isEmail(value)) {
                        throw new Error("Entered email is invalid");
                    }
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

eventSchema.pre("save", async function (next) {
    console.log("just before saving");
    next();
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
