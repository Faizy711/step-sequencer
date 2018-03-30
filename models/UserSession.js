const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    isDeleted:{
        type: Boolean,
        default:false
    }
});

var UserSessionSchema = mongoose.model('UserSession', UserSessionSchema);
module.exports = UserSessionSchema;