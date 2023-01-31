/*
 * Contributor: Ahmed Hassan, Mayank Chetan Parvatia
 */

require("dotenv").config();
const { Review, db } = require("../config/mysqldatabase.config");
const { Op } = require("sequelize");


module.exports.getAllReviews = async (req, res, next) => {
    try {
        const media_id = req.body.media_id
        //const result = await Review.findAll({
        //    attributes: ['media_id', 'ratings', 'comment', 'posted_by', 'posted_date'],
        //    where: {
        //        media_id: media_id
        //    }
        //},        
        //);
        const [result, metadata] = await db.sequelize.query(
            "SELECT tr.*, CONCAT(u.first_name, ' ', u.last_name) AS posted_by FROM `tbl_reviews` tr JOIN user u on tr.posted_by = u.id WHERE tr.media_id = " + media_id + ";"
            , { type: Op.SELECT }
        );

        return res.json({
            status: "success",
            result: result,
        });
    } catch (err) {
        return next(
            res.status(500).json({
                error: {
                    message: "Internal error occurred",
                    reason: err.message,
                },
            })
        );
    }
};

module.exports.createReview = async (req, res, next) => {
    try {
        var media_id = req.body.media_id;
        var ratings = req.body.ratings;
        var comment = req.body.comment;
        var posted_by = req.body.posted_by;

        const result = await Review.create({
            media_id: media_id,
            ratings: ratings,
            comment: comment,
            posted_by: posted_by,
        });

        return res.json({
            status: "success",
            result: {
                record: result,
            },
        });
    } catch (err) {
        return next(
            res.status(500).json({
                error: {
                    message: "Internal error occurred",
                    reason: err,
                },
            })
        );
    }
};
