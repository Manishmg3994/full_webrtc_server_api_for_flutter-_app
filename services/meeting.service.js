const { meeting } = require("../models/meeting.model");
const { meetingUser } = require("../models/meeting-user.model");

async function getAllMeetingUsers(meetId, callback) {
    meetingUser.find({ meetingId: meetId }).then((response) => {
            return callback(null, response);

        })
        .catch((error) => { return callback(error); });
}

async function startMeeting(parms, callback) {
    const meetingSchema = new meeting(parms);
    meetingSchema
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);

        });
}





async function joinMeeting(parms, callback) {
    const meetingUserModel = new meetingUser(parms);
    meetingUserModel
        .save()
        .then(async(response) => {
            await meeting.findOneAndUpdate({ id: parms.meetingId }, {
                $addToSet: { "meetingUsers": meetingUserModel }

            })
            return callback(null, response);
        })
        .catch((error) => { return callback(error); });
}
async function isMeetingPresennt(meetingId, callback) {
    meeting.findById(meetingId).populate("meetingUsers", "MeetingUser").then((response) => {
        if (!response) callback("Invalid Meeting Id");
        else callback(null, true);
    }).catch((error) => {
        return callback(error, false)
    });
}

async function checkMeetingExisits(meetingId, callback) {
    meeting.findById(meetingId, hostId, hostName, sartTime).populate("meetingUsers", "MeetingUser").then((response) => {
        if (!response) callback("Invalid Meeting Id");
        else callback(null, true);
    }).catch((error) => {
        return callback(error, false)
    });
}


async function getMeetingUser(parms, callback) {
    const { meetingId, userId } = parms;
    meetingUser.find({ meetingId, userid }).then((response) => {
            return callback(null, response[0])
        })
        .catch((error) => { return callback(error) });
}




async function updateMeetingUser(parms, callback) {
    meetingUser
        .updateOne({ userId: parms.userId }, { $set: parms }, { new: true })
        .then((response) => {
            return callback(null, response);

        }).catch((error) => { return callback(error); });
}

async function getUserBySocketId(socketId, callback) {
    const { meetingId, socketId } = parms;
    meetingUser.find({ meetingId, socketId }).limit(1).then((response) => {
            returncallback(null, response);
        })
        .catch((error) => { return callback(error); });
}
module.exports = {
    startMeeting,
    joinMeeting,
    getAllMeetingUsers,
    isMeetingPresennt,
    checkMeetingExisits,
    getUserBySocketId,
    updateMeetingUser,
    getMeetingUser
};