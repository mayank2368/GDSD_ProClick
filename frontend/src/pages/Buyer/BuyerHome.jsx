/*
 * Contributor: Abdullah Khalid and Mayank Chetan Parvatia
 */

import axios from "axios";
import { React, useEffect, useState } from "react";
import { selectUserToken } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import PostItem from "../../components/PostItem/PostItem";
import SearchBar from "../Buyer/SearchBar";
import { CONSTANTS } from "../../utils";

//import BuyerDetail from "./BuyerDetail";

const BuyerHome = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector(selectUserToken);

  function mLoadBuyerPosts() {
    const bodyParameters = {
      status: CONSTANTS.APPROVED,
    };
    // eslint-disable-next-line no-undef
    let MEDIA_URL =
      // eslint-disable-next-line no-undef
      process.env.REACT_APP_API_BASE_URL + "/media/allapprovedmedia";
    // prettier-ignore
    const HEADER = { headers: { Authorization: `Bearer ${token}` },};
    axios
      .post(MEDIA_URL, bodyParameters, HEADER)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    mLoadBuyerPosts();
  }, [searchTerm == ""]);

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 2 }}>
      <SearchBar
        setPosts={setPosts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 3 }}
        sx={{ mt: 2 }}
      >
        {posts?.length > 0 ? (
          posts?.map((data, index) => (
            <Grid item xs={12} md={4} key={index} onClick={() => {}}>
              <div>
                {/* <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/mediadetail"
                  exact
                  state={data}
                > */}

                {console.log("single data buyer home", data)}
                <PostItem
                  title={data.title}
                  description={data.description}
                  mediaPath={data.media_path}
                  key={index}
                  data={data}
                  media_category={data.media_category}
                />
                {/* </NavLink> */}
              </div>
            </Grid>
          ))
        ) : (
          <h3> No Product Exist</h3>
        )}
      </Grid>
    </Box>
  );
};

export default BuyerHome;
