/*
 * Contributor: Tarmah Bin Iqbal
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItemAdmin from "./ApprovedItemAdmin";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { selectUserToken } from "../../redux/slices/auth";
import { CONSTANTS } from "../../utils";

const AllApprovedAdmin = () => {
  const [post, setPost] = useState([]);
  const [loading, setReloading] = useState(false);
  const token = useSelector(selectUserToken);

  let MEDIA_URL =
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_API_BASE_URL + "/media/allapprovedmedia";

  useEffect(() => {
    loadApprovedPosts();
  }, []);

  function loadApprovedPosts() {
    const bodyParameters = {
      status: CONSTANTS.APPROVED,
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
              <PostItemAdmin
                title={data.title}
                description={data.description}
                mediaPath={data.media_path}
                media_id={data?.media_id}
                key={index}
                setLoading={setReloading}
                loading={loading}
              />
            </Grid>
          ))
        ) : (
          <h3> No Product Exist</h3>
        )}
      </Grid>
    </Box>
  );
};

export default AllApprovedAdmin;
