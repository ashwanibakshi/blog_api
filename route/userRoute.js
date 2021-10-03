const express        = require("express");
const userController = require("../controller/userController");
const router  = express.Router();


router.post("/add",userController.addUser);

router.get("/profile/edit/:id",userController.editUserProfile);

router.put("/profile/update",userController.updateUserProfile);

router.put("/update/status",userController.updateUserStatus)

router.get("/showall",userController.showAllUser);

module.exports = router;