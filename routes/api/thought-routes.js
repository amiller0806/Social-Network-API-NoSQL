const router = require('express').Router();
// Instead of importing the entire object and having to do 
// thoughtController.getThoughts(), we can simply destructure the method names out of the imported object and use those names directly
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-controllers');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  // provide the name of the controller method as the callback -
//   which is why we set up those methods to accept req and res as parameters
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
