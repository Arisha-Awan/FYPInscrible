const mongo = require('mongoose');

const userSchema = mongo.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    metamask:{
        type: Boolean,
        required: true
    }
});

mongo.model("USER", userSchema);