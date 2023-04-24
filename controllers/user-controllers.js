const {
    User
} = require('../models');


// Source for some comments: https://mongoosejs.com/docs/middleware.html

module.exports = {
    // Get all users
    getUsers(req, res) {
        // Using Mongoose query middleware method find()
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.userId
        })
            .select('-__v')
            .then((user) =>
                !user ?
                    res.status(404).json({
                        message: 'No user with that ID'
                    }) :
                    res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({
            _id: req.params.userId
        })
            .then((user) =>
                
                    res.json(user)
            )

    
            .catch((err) => res.status(500).json(err));

    },




    // Updates and user using the Mongoose middleware findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    updateUser(req, res) {
        User.findOneAndUpdate({
            _id: req.params.userId
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        })
        .then((user) =>
              res.json(user)
    
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    },

    // Adds a friend
    addFriend(req, res) {
            User.findOneAndUpdate({
                    _id: req.params.userId
                }, {
                    $addToSet: {
                        friends: req.params.friendId
                    }
                }, {
                    runValidators: true,
                    new: true
                })
                .then((user) =>
                   
                    res.json(user)
                )
                .catch((err) => res.status(500).json(err));
        },
        // Remove friend
       deleteFriend(req, res) {
            User.findOneAndUpdate({
                    _id: req.params.userId
                }, {
                    $pull: {
                        friends: req.params.friendId
                        
                    }
                }, {
                    runValidators: true,
                    new: true
                })
                .then((user) =>
                    
                    res.json(user)
                )
                .catch((err) => res.status(500).json(err));
        },
}
    



    


        