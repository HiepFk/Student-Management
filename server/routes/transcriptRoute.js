const transcriptController = require("../controllers/transcriptController");
const authController = require("../controllers/authController");

const router = require("express").Router();
router.use(authController.protect);

router
  .route("/MyTranscript")
  .get(
    authController.restrictTo("student"),
    transcriptController.getMyTranscript
  );

router
  .route("/Student/:id")
  .get(
    authController.restrictTo("phongDaoTao", "teacher", "phongCtsv"),
    transcriptController.getTranscriptStudent
  );

router.use(authController.restrictTo("phongDaoTao"));

router
  .route("/")
  .post(transcriptController.addTranscript)
  .get(transcriptController.getAllTranscript);

router
  .route("/:id")
  .patch(transcriptController.updateTranscript)
  .get(transcriptController.getTranscript);

module.exports = router;
