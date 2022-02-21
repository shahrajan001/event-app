const express = require("express");
const router = new express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/createUser", userController.createUser);
router.post("/loginUser", userController.loginUser);
router.get("/userDetails",auth, userController.userDetails);
router.patch("/updateUser",auth, userController.updateUser);
router.get("/userEvents", auth, userController.userEvents);       //for getting user Tasks
// router.post("/uploadAvatar", userController.uploadAvatar);
// router.get("/viewAvatar", userController.viewAvatar);
// router.delete("/deleteAvatar", userController.deleteAvatar);
router.post("/logout", auth,userController.logout);
router.post("/logoutAll", auth, userController.logoutAll);
router.delete("/deleteUser",auth, userController.deleteUser);

module.exports = router;