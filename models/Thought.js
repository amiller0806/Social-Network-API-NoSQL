const {
    Schema,
    model
} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Schema to create Post model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'You must leave a thought!',
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: 
        [reactionSchema]

},
    
    {
    toJSON: {
        getters: true,
    },
    id: false,

});
// Create a virtual property `getTags` that gets the amount of tags associated with an application
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialize our Application model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;