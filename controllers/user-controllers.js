const {
    User
} = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
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




    // Updates and user using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
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
                                //     res.status(404).json({
                //         message: 'No user with this id!'
                //     }) :
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
    



    


        //     // update user by id
        //     updateUser({
        //         params,
        //         body
        //     }, res) {
        //         User.findOneAndUpdate({
        //                 _id: params.id
        //             }, body, {
        //                 new: true,
        //                 runValidators: true
        //             })
        //             .then(dbUserData => {
        //                 if (!dbUserData) {
        //                     return res.status(404).json({
        //                         message: 'No user found with this id!'
        //                     });

        //                 }
        //                 res.json(dbUserData);
        //             })
        //             .catch(err => {
        //                 res.status(500).json(err);
        //             });
        //     },

        //     // delete user




        // module.exports = userController;