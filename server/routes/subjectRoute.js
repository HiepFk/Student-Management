const subjectController = require("../controllers/subjectController");
const authController = require("../controllers/authController");

const router = require("express").Router();
router.use(authController.protect);

router
  .route("/MySubject")
  .get(authController.restrictTo("teacher"), subjectController.getMySubject);
router
  .route("/Teacher/:id")
  .get(
    authController.restrictTo("phongDaoTao", "teacher"),
    subjectController.getTeacherSubject
  );

router
  .route("/")
  .post(authController.restrictTo("phongDaoTao"), subjectController.addSubject)
  .get(
    authController.restrictTo("student", "phongDaoTao", "phongKhaoThi"),
    subjectController.getAllSubject
  );

router.use(authController.restrictTo("phongDaoTao"));

router
  .route("/:id")
  .patch(subjectController.updateSubject)
  .get(subjectController.getSubject)
  .delete(subjectController.deleteSubject);

module.exports = router;
