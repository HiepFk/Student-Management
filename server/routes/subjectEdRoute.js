const subjectEdController = require("../controllers/subjectEdController");
const authController = require("../controllers/authController");

const router = require("express").Router();
router.use(authController.protect);

// Sinh viên
router
  .route("/MyEd")
  .get(authController.restrictTo("student"), subjectEdController.getMySubject);
router
  .route("/MyEdPoint")
  .get(
    authController.restrictTo("student"),
    subjectEdController.getMySubjectEd
  );
router
  .route("/NotMy")
  .get(
    authController.restrictTo("student"),
    subjectEdController.getNotMySubject
  );
router
  .route("/DKThiLai/:id")
  .patch(authController.restrictTo("student"), subjectEdController.DKThiLai);

router
  .route("/")
  .post(
    authController.restrictTo("phongDaoTao", "student"),
    subjectEdController.addSubjectEd
  )
  .get(
    authController.restrictTo("phongDaoTao", "phongKhaoThi"),
    subjectEdController.getAllSubjectEd
  );

router
  .route("/:id")
  .patch(
    authController.restrictTo("phongDaoTao", "phongKhaoThi"),
    subjectEdController.updateSubjectEd
  )
  .get(
    authController.restrictTo("phongDaoTao", "phongKhaoThi"),
    subjectEdController.getSubjectEd
  )
  .delete(
    authController.restrictTo("phongDaoTao", "student"),
    subjectEdController.deleteSubjectEd
  );

router
  .route("/Student/:id")
  .get(
    authController.restrictTo("phongDaoTao", "phongKhaoThi"),
    subjectEdController.getStudentSubject
  );

module.exports = router;
