/*
 * Author: Ahmed Hassan
 * Contributor: Mayank Chetan Parvatia
 */

"use strict";
var { dbConn } = require("../config/mysqldatabase.config");
//Media object create
var Media = function (media) {
  this.media_id = media.media_id;
  this.title = media.title;
  this.media_category = media.media_category;
  this.sub_category = media.sub_category;
  this.description = media.description;
  this.media_path = media.media_path;
  this.price = media.price;
  this.is_free = media.is_free;
  this.status = media.status;
  this.user_id = media.user_id;
};
//var ImageData = function (imageData) {
//    this.id = imageData.id;
//    this.title = imageData.title;
//    this.description = imageData.description;
//    this.ipath = imageData.ipath;
//};
Media.create = function (newData, result) {
  dbConn.query(
    "INSERT INTO tbl_media set ?",
    newData,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    }
  );
};
Media.findByKeyword = function (keyword, result) {

    dbConn.query("Select * from tbl_media where IFNULL(title, '') LIKE '%" + keyword + "%' OR IFNULL(media_category, '') LIKE '%" + keyword + "%' OR IFNULL(sub_category, '') LIKE '%" + keyword + "%'", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Media.findByjoin = function (user_id, media_id, result) {

    dbConn.query("SELECT user.first_name, user.last_name, user.email, user.createdAt, tbl_media.* FROM user  JOIN tbl_media ON user.id = tbl_media.user_id WHERE user.id = ? and tbl_media.media_id = ?", [user_id, media_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Media.findAll = function (result) {
  dbConn.query("Select * from tbl_media", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("tbl_media : ", res);
      result(null, res);
    }
  });
};
Media.findPendingMedia = function (status, result) {
    dbConn.query("Select * from tbl_media where status = ?" ,status, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("tbl_media : ", res);
            result(null, res);
        }
    });
};

Media.findApprovedMedia = function (status, result) {
    dbConn.query("Select * from tbl_media where status = ?", status, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("tbl_media : ", res);
            result(null, res);
        }
    });
};

Media.findPendingMediaByUser = function (status, user_id, result) {
    dbConn.query("Select * from tbl_media where status = ? and user_id = ?", [status, user_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("tbl_media : ", res);
            result(null, res);
        }
    });
};

Media.getApprovedMedia = function (status, user_id, result) {
    dbConn.query("Select * from tbl_media where status = ? and user_id = ?", [status, user_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("tbl_media : ", res);
            result(null, res);
        }
    });
};
Media.approveMediaByAdmin = function (status, media_id, result) {
    dbConn.query("update tbl_media set status = ? where media_id = ?", [status, media_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("tbl_media : ", res);
            result(null, res);
        }
    });
};

Media.update = function (id, media, result) {
  dbConn.query(
      "UPDATE tbl_media SET title=COALESCE(?, title),media_category=COALESCE(?, media_category),sub_category=COALESCE(?, sub_category),"+
      "description =COALESCE(?, description), media_path =COALESCE(?, media_path), price =COALESCE(?, price), is_free =COALESCE(?, is_free), status = COALESCE(?, status)"+
      "WHERE media_id = ? ",
    [
        media.title,
        media.media_category,
        media.sub_category,
        media.description,
        media.media_path,
        media.price,
        media.is_free,
        media.status,
        id
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Media.delete = function (id, result) {
  dbConn.query("DELETE FROM tbl_media WHERE media_id = ?", [id],function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = {
    Media,
    //ImageData,
};
