const mongoose = require('mongoose');
const { schema } = mongoose;
const MeetingUser = mongoose.model("MeetingUser",
    mongoose.schema({
        socketId: {
            type: String,
        },
        meetingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meeting"
        },
        UserId: {
            type: String,
            required: true
        },
        joined: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        isAlive: {
            type: Boolean,
            required: true
        },

    }, { timestamps: true }));
module.exports = {
    MeetingUser
};