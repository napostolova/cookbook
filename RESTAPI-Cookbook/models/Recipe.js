const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[ true, 'Title is required'],
        minLength: [5 , 'Title must be at least 5 symbols']
    },
    products: [ ],
     description: {
        type: String,
        required: [ true, 'Description is required'],
        minLength: [10 , 'Description must be at least 10 symbols']
    },
    imageUrl: {
        type: String,
        required:[ true, 'Image is required'],
        validate: {
            validator: function (v) {
                return /^http(|s):\/\//.test(v);
            },
            message: props => `Image address must begin with http(s)://`
        },
    },   
    type: {
        type: String,
        required:[ true, 'Image is required'],
    },    
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    ownerId: {
        type: ObjectId,
        ref: "User"
    },
    // recents: [{
    //     type: ObjectId,
    //     ref: "Recent"
    // }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Recipe', recipeSchema);
