const apiController = require("express").Router();
const loginController = require("./login/login.controller");
const movieController = require("./movie.controller");
const personController = require("./person.controller");
const searchController = require("./search/search.controller");
const profileController = require("./profile/profile.controller");
const followController = require("./profile/follow.controller");
const reviewController = require("./review/review.controller");
const adminController = require("./admin/admin.controller");
const favoritesController = require("./profile/favorites.controller");
const getPresignedUrl = require("./profile/upload.controller");
/**
 * api/login
 */
apiController.use("/login", loginController);
apiController.use("/movie", movieController);
apiController.use("/search", searchController);
apiController.use("/person", personController);
apiController.use("/profile", profileController);
apiController.use("/follow", followController);
apiController.use("/review", reviewController);
apiController.use("/admin", adminController);
apiController.use("/favorite", favoritesController);
apiController.use("/upload", getPresignedUrl);

module.exports = apiController;
