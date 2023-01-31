/* eslint-disable no-unused-vars */
/*
 * Contributor: Abdullah Khalid and Tarmah Bin Iqbal
 */

import * as React from "react";

import "./PostItem.css";
import { NavLink } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { selectUserToken } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/slices/auth";
import { CONSTANTS } from "../../utils";

import axios from "axios";

const PostItem = ({ title, description, mediaPath, data, media_category }) => {
  // eslint-disable-next-line no-undef
  let IMAGE_API = process.env.REACT_APP_IMAGE_URL;

  const token = useSelector(selectUserToken);
  const role = useSelector(selectUserRole);

  const deletePost = (id) => {
    let DELETE_URL =
      process.env.REACT_APP_API_BASE_URL + "/media/removemedia/" + id;
    axios
      .delete(DELETE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        //setRerender(true);
      })
      .catch((err) => console.log(err));
    window.location.reload(true);
  };

  return (
    <>
      <NavLink
        className="navbar-item"
        activeClassName="is-active"
        to="/mediadetail"
        exact
        state={data}
      >
        <div className="container">
          <div className="column">
            <div className="post-module">
              <div className="thumbnail">
                <img src={IMAGE_API + mediaPath} />
              </div>

              <div className="post-content">
                <div className="category">{media_category}</div>
                <h1 className="title">{title}</h1>
                {/* <h2 className="sub_title">The city that never sleeps.</h2> */}
                <p className="description">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      {role !== CONSTANTS.ROLES.BUYER && (
        <LoadingButton
          size="small"
          color="secondary"
          onClick={() => deletePost(data.media_id)}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          DELETE
        </LoadingButton>
      )}
    </>
  );
};

export default PostItem;
