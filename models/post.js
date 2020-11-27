const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: "Model måste anges"
    },
    city: {
        type: String,
        required: "Stad måste anges"
    },
    phone: {
        type: String,
        required: "Telefon måste anges"
    },
    email: {
        type: String,
        trim: true,
        required: "E-post måste anges"
    },
    photo: {
        data: Buffer,
        contenType: String
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: ObjectId, ref: 'User' }
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);
