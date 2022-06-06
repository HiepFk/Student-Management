const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = require("express").Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);
router.get("/me", userController.getMe);
router.patch("/updateMyPassword", authController.updatePassword);
router.patch("/updateInfo", userController.proPhoto, userController.updateMe);

router.use(
  authController.restrictTo("admin", "phongCtsv", "teacher", "phongDaoTao")
);

router.route("/").post(userController.addUser).get(userController.getAllUsers);

router
  .route("/:id")
  .patch(userController.proPhoto, userController.updateUser)
  .get(userController.getUser);

module.exports = router;
