/*
 * Contributor: Ahmed Hassan, Mayank Chetan Parvatia
 */

"use strict";
const { Media } = require("./../models/image-data.model");

exports.findAll = function (req, res) {
  console.log("++++++++++");
  Media.findAll(function (err, imageData) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", imageData);
    res.send(imageData);
  });
};
exports.findByjoin = function (req, res) {
  var user_id = req.body.user_id;
  var media_id = req.body.media_id;
  Media.findByjoin(user_id, media_id, function (err, imageData) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", imageData);
    res.send(imageData);
  });
};
exports.findPendingMedia = function (req, res) {
  var status = req.body.status;
  Media.findPendingMedia(status, function (err, imageData) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", imageData);
    res.send(imageData);
  });
};

exports.findApprovedMedia = function (req, res) {
  var status = req.body.status;
  Media.findApprovedMedia(status, function (err, imageData) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", imageData);
    res.send(imageData);
  });
};

exports.findPendingMediaByUser = function (req, res) {
  var status = req.body.status;
  var user_id = req.body.user_id;
  Media.findPendingMediaByUser(status, user_id, function (err, imageData) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", imageData);
    res.send(imageData);
  });
};

exports.getApprovedMedia = function (req, res) {
  var status = req.body.status;
  var user_id = req.body.user_id;
  Media.getApprovedMedia(status, user_id, function (err, imageData) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", imageData);
    res.send(imageData);
  });
};
exports.create = function (req, res) {
  const new_image = new Media(req.body);
  new_image.media_path = req.file.filename;
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Media.create(new_image, function (err, media) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Media added successfully!",
        data: media,
      });
    });
  }
};
exports.findByKeyword = function (req, res) {
  Media.findByKeyword(req.body.keyword, function (err, imageData) {
    if (err) res.send(err);
    res.json(imageData);
  });
};
exports.update = function (req, res) {
  const media = new Media(req.body);
  if (req.file != null || req.file != undefined) {
    media.media_path = req.file.filename;
  }
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    Media.update(req.params.id, new Media(media), function (err, result) {
      var message = "Not found";
      if (err) {
        res.send(err);
      } else {
        if (result.affectedRows == 1) {
          message = "Media successfully updated";
        }
        res.json({ error: false, message, affectedRows: result.affectedRows });
      }
    });
  }
};
exports.delete = function (req, res) {
  Media.delete(req.params.id, function (err, result) {
    var msg = "Not found";
    if (err) {
      res.send(err);
    } else {
      if (result.affectedRows == 1) {
        msg = "Media successfully deleted";
      }
      res.json({ error: false, msg, affectedRows: result.affectedRows });
    }
  });
};
