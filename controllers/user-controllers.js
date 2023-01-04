const {
    User
} = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getUserById(req, res) {
        User.findOne({
                _id: req.params.userId
            })

            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then(dbUserData => {
                // If no user found, send 404
                if (!dbUserData) {
                    return res.status(404).json({
                        message: 'No user found with this id'

                    });

                }
                res.json(dbUserData);
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // createUser
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update user by id
    updateUser({
        params,
        body
    }, res) {
        User.findOneAndUpdate({
                _id: params.id
            }, body, {
                new: true,
                runValidators: true
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({
                        message: 'No user found with this id!'
                    });

                }
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    },

    // delete user
    deleteUser({
        params
    }, res) {
        User.findOneAndDelete({
                _id: params.id
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({
                        message: 'No user found with this id!'
                    });

                }
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    },

    // add friend
    addUser({
        params
    }, res) {
        User.findOneAndAdd({
                _id: params.id
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;