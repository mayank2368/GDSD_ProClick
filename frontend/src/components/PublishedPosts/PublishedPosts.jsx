/*
 * Contributor: Abdullah Khalid, Tarmah Bin Iqbal and Mayank Chetan Parvatia
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import PostItem from "../PostItem/PostItem";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { selectUserToken, selectUserID } from "../../redux/slices/auth";
import { CONSTANTS } from "../../utils";
//import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const PublishedPosts = () => {
  const [post, setPost] = useState([]);
  const token = useSelector(selectUserToken);
  const userId = useSelector(selectUserID);

  let MEDIA_URL =
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_API_BASE_URL + "/media/getapprovedmediabyuser";

  useEffect(() => {
    loadPublishedPosts();
  }, []);

  function loadPublishedPosts() {
    const bodyParameters = {
      status: CONSTANTS.APPROVED,
      user_id: userId,
    };
    axios
      .post(MEDIA_URL, bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        {post.length > 0 ? (
          post.map((data, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PostItem
                title={data.title}
                description={data.description}
                mediaPath={data.media_path}
                key={index}
                data={data}
                media_category={data.media_category}
              />
              <Button variant="outlined">
                <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/updatemedia"
                  exact
                  state={data}
                >
                  Update Media
                </NavLink>
              </Button>
            </Grid>
          ))
        ) : (
          <h3> No Product Exist</h3>
        )}
      </Grid>
    </Box>
  );
};

export default PublishedPosts;
