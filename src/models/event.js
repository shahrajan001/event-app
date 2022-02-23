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
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
            }

        ],
        acceptedList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            }  
        ],
    },
    {
        timestamps: true,
    }
);

eventSchema.pre("save", async function (next) {
    next();
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
