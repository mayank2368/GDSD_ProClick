/*
 * Contributor: Ahmed Hassan
Contributor: bilal ahmad, Abdullah Khalid, Tarmah Bin Iqbal, Mayank Chetan Parvatia
 */

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { selectUserID, selectUserFirstName } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUserToken } from "../../redux/slices/auth";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { saveAs } from "file-saver";
import moment from "moment";
import "./media.css";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const MediaDetail = () => {
  const location = useLocation();
  const data = location.state;
  const userId = useSelector(selectUserID);
  const firstName = useSelector(selectUserFirstName);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const token = useSelector(selectUserToken);
  const [addReviewStatus, setAddReviewStatus] = useState(false);

  let navigate = useNavigate();
  const HEADER = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log("DATA IN MEDIA DETAILS ", location);

  const addReview = () => {
    let buyerId = userId;
    // let sellerId = data?.user_id;

    let body = {
      media_id: data.media_id,
      ratings: 3,
      comment: review,
      posted_by: buyerId,
    };

    let API =
      // eslint-disable-next-line no-undef
      process.env.REACT_APP_API_BASE_URL + `/review/addreview`;

    const HEADER = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (review && review !== "") {
      axios
        .post(API, body, HEADER)
        .then((res) => {
          console.log(res);
          setReview("");
          setAddReviewStatus(true);
          setTimeout(() => {
            setAddReviewStatus(false);
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
    window.location.reload(true);
  };
  let URL =
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_API_BASE_URL + "/review/getreviews";
  const searchreview = () => {
    const bodyParameters = {
      media_id: data.media_id,
    };

    axios
      .post(URL, bodyParameters, HEADER)
      .then((resp) => setReviews(resp.data.result))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    searchreview();
    console.log(URL + "  " + "GET REVIEWS " + reviews.length);
  }, []);

  // prettier-ignore
  // eslint-disable-next-line no-undef
  let API =  process.env.REACT_APP_API_BASE_URL + `/conversation/buyersellerconveration`;
  // prettier-ignore
  console.log(API)
  // prettier-ignore
  const initiateChat = () => {
    let buyerId = userId;
    let sellerId = data?.user_id;

      // prettier-ignore
      const bodyParameters = {
        // prettier-ignore
        buyer_Id: buyerId,
        seller_Id: sellerId
      };
    axios
      .post(API, bodyParameters)
      .then((res) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { id } = res?.data?.result?.record;
        console.log(id, firstName);
        navigate(
          `/chat?name=${firstName}&room=${id}&senderId=${userId}&conversationId=${id}`
        );
      })
      .catch((err) => console.log(err));

  };

  const get_url_extension = (url) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  };

  const getDownload = async (data) => {
    const image_href = IMAGE_API + encodeURIComponent(data.media_path);
    const extension = get_url_extension(image_href);
    saveAs(image_href, `image.${extension}`); // Put your image url here.
  };
  console.log("++++++++++++here is the data", data);

  // eslint-disable-next-line no-undef
  let IMAGE_API = process.env.REACT_APP_IMAGE_URL;
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          flexWrap: "wrap",
        }}
      >
        <Item sx={{ backgroundColor: "#FFFFFF", border: "none" }}>
          <Typography variant="h3" sx={{ color: "#009999" }}>
            {data?.title}
          </Typography>
        </Item>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Item
            sx={{ flexGrow: 1, backgroundColor: "#FFFFFF", border: "none" }}
          >
            <div>
              <CardMedia
                component="img"
                height="450"
                image={IMAGE_API + data.media_path}
                alt="green iguana"
              />
              <Typography variant="h6" sx={{ mr: 3, color: "#666" }}>
                Description: {data.description}
              </Typography>
              <Typography variant="p">Price: Є{data.price}</Typography>
              <Typography variant="p">{data.category}</Typography>
            </div>

            <div>
              <h5>Product Reviews</h5>
              <hr />
              {reviews.length > 0 ? (
                reviews.map((rev) => {
                  return (
                    <p key={rev.review_id}>
                      Comment: {rev.comment} <br />
                      Posted by: {rev.posted_by} <br />
                      Posted Date: {moment(rev.posted_date).format("LLLL")}{" "}
                      <br />
                    </p>
                  );
                })
              ) : (
                <p> No reviews for this product </p>
              )}
              {/* <h5>Product Reviews</h5> */}
              <hr />
              <Card sx={{ width: 345, marginTop: "3%" }}>
                <CardActionArea>
                  <CardContent>
                    <TextareaAutosize
                      minRows={5}
                      aria-label="text-area"
                      placeholder="Add your review here...."
                      style={{ width: "100%" }}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ mt: 5 }}
                      onClick={addReview}
                    >
                      Add Review
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
              {addReviewStatus && (
                <Alert severity="success">Review Successfully added !!</Alert>
              )}
            </div>
          </Item>

          <Item
            sx={{
              height: "350px",
              width: "250",
              padding: "20px",
              backgroundColor: "#D3D3D3",
              borderRadius: "0px",
              alignItems: "center",
              border: "none",
            }}
          >
            <Button
              className="btn btn-primary tm-btn-big"
              sx={{
                width: "265px",
                height: "50px",
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "10px",
                color: "#FFFFFF",
                backgroundColor: "#009999",
              }}
              onClick={initiateChat}
            >
              Contact
            </Button>

            <div>
              {!!data && !data.is_free ? (
                "Media is not free. Contact the Seller!"
              ) : (
                <Button
                  className="btn btn-primary tm-btn-big"
                  sx={{
                    width: "265px",
                    height: "50px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "10px",
                    color: "#FFFFFF",
                    backgroundColor: "#009999",
                  }}
                  onClick={() => getDownload(data)}
                >
                  Download
                </Button>
              )}
            </div>
          </Item>
        </Box>
      </Box>
    </div>
  );
};

export default MediaDetail;
