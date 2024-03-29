const {
    Thought,
    User
} = require('../models');


// Use CRUD methods - Create resource ,Retrieve resource, Update resource, Delete resource
// Here, we set up routes for CRUD methods & implement controller methods 
module.exports = {
    // Function to get all of the thoughts by invoking the find() method with no arguments.
    // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
    getThoughts(req, res) {
        Thought.find()

            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Gets a single thought using the findOneAndUpdate method. We pass in the ID of the thought and then respond with it, or an error if not found
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.thoughtId
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'No thought with that ID'
                }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Creates a new thought. Accepts a request body with the entire Thought object.
    // Because thoughts are associated with Users, we then update the User who created the thought and add the ID of the thought to the thoughts array
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $addToSet: {
                        thoughts: thought._id
                    }
                }, {
                    new: true
                });
            })
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                }) :
                res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Updates and thoughts using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    updateThought(req, res) {
      // using Mongoose QUERY middleware findOneAndUpdate
      Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      )
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // Deletes a thought from the database. Looks for an thought by ID.
    // Then if the thought exists, we look for any users associated with the thought based on the thought ID and update the thoughts array for the User.
    deleteThought(req, res) {
      // using Mongoose QUERY middleware findOneAndRemove
      Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      })
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: "No thought with this id!",
              })
            : User.findOneAndUpdate(
                {
                  thought: req.params.thoughtId,
                },
                {
                  $pull: {
                    thoughts: req.params.thoughtId,
                  },
                },
                {
                  new: true,
                }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({
                message: "Thought created but no user with this id!",
              })
            : res.json({
                message: "Thought successfully deleted!",
              })
        )
        .catch((err) => res.status(500).json(err));
    },

    // Creates a new reaction
    addReaction(req, res) {
        // using Mongoose QUERY middleware findOneAndUpdate
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({
                        message: 'No thought with this id!'
                    });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    },


// Deletes existing reaction 
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }
            }, )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({
                        message: 'No thought with this id!'
                    });

                }
                res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};