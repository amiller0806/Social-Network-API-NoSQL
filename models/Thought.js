const {
    Schema,
    model, 
} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      // type instructs schema this data will adhere to built-in JS types including strings, Booleans, numbers etc
      type: String,
      required: "You must leave a thought!",
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // updating CommentSchema and ReplySchema to use toJSON and add getters to all timestamp-related fields.
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    // associating reactions with thoughts
    // reactions will be nested directly in a thought's document and not referred to - it's a subdocument
    reactions: [reactionSchema],
  },

  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Create a virtual property `reactionCount' that gets the total amount of reactions associated with a thought
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;