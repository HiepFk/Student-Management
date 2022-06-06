const classController = require("../controllers/classController");
const authController = require("../controllers/authController");

const router = require("express").Router();
router.use(authController.protect);
router
  .route("/MyClass")
  .get(authController.restrictTo("teacher"), classController.getMyClass);
router
  .route("/Teacher/:id")
  .get(
    authController.restrictTo("phongDaoTao", "teacher"),
    classController.getTeacherClass
  );

router.use(authController.restrictTo("phongDaoTao"));

router
  .route("/")
  .post(classController.addClass)
  .get(classController.getAllClass);

router
  .route("/:id")
  .patch(classController.updateClass)
  .get(classController.getClass)
  .delete(classController.deleteClass);

module.exports = router;
