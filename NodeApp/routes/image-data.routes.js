//Contributor : Hamza Mazhar
// Added authentication bussiness logic and middleware
/*
 * Contributor: Ahmed Hassan and Mayank Chetan Parvatia and bilal ahmad
 * added authentication and new endpoints
 * Added Mpeg filetype
 */

const { Router } = require("express");
const router = Router();

// Import Middlewares
const { authenticateToken } = require("../middleware/userMiddleware");

//Import service/controller
const mediaService = require("./../services/image-data.service");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.normalize(__dirname + "./../uploads/images"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "audio/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

// Create a new image
router.post(
  "/create",
  [authenticateToken],
  upload.single("media_path"),
  mediaService.create
);
// Retrieve by title
router.post(
  "/searchbykeyword",
  [authenticateToken],
  mediaService.findByKeyword
);
// Update an image with id
router.put(
  "/update/:id",
  [authenticateToken],
  upload.single("media_path"),
  mediaService.update
);
// Delete an image with id
router.delete("/removemedia/:id", [authenticateToken], mediaService.delete);
// Retrieve all pending media
router.post(
  "/pendingmedia",
  [authenticateToken],
  mediaService.findPendingMedia
);

router.post(
  "/approvedmediabyuser",
  [authenticateToken],
  mediaService.getApprovedMedia
);
router.post(
  "/allpendingmedia",
  [authenticateToken],
  mediaService.findPendingMedia
);

// Retrieve all approved media
router.post(
  "/allapprovedmedia",
  [authenticateToken],
  mediaService.findApprovedMedia
);

router.post(
  "/getapprovedmediabyuser",
  [authenticateToken],
  mediaService.getApprovedMedia
);

// Retrieve all pending media for a specific user
router.post(
  "/pendingmediabyuser",
  [authenticateToken],
  mediaService.findPendingMediaByUser
);

router.post("/getsellerdetails", [authenticateToken], mediaService.findByjoin);

// Retrieve all media
router.post("/all", [authenticateToken], mediaService.findAll);

module.exports = router;
