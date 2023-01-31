require("dotenv").config();
const { Sales } = require("../config/mysqldatabase.config");
const { Op } = require("sequelize");

module.exports.createSale = async (req, res, next) => {
    try {
        var media_id = req.body.media_id;
        var buyer_id = req.body.buyer_id;
        var seller_id = req.body.seller_id;

        const result = await Sales.create({
            media_id: media_id,
            buyer_id: buyer_id,
            seller_id: seller_id,
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
