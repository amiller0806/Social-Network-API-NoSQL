const {
    Schema,
    model
} = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+\@.+\..+/, "Must match a valid email address!"],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        // The ref property is especially important because it tells the User model which documents to search to find the right thoughts.

        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    // Virtuals enable us to add more info to database response so we don't have to add the info manually w. a helper before responding to API request
    //   Virtuals allow you to add virtual properties to a document that aren't stored in the database
    toJSON: {
      // Here, we are telling the schema it can use virtuals
      virtuals: true,
    },
    // setting id to false bc this is a virtual that mongoose returns and we don't need it
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
