/* eslint-disable no-unused-vars */
/*
 * Contributor: Abdullah Khalid and Tarmah Bin Iqbal and Ahmed Hassan
 */

// eslint-disable-next-line no-unused-vars

import axios from "axios";
import { selectUserToken } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import MicIcon from "@mui/icons-material/Mic";
import { React, useState } from "react";
import SpeechToText from "../../components/SpeechToText/SpeechToText";

// eslint-disable-next-line no-unused-vars

const SearchMedia = ({ searchTerm, setPosts, setSearchTerm }) => {
  const token = useSelector(selectUserToken);
  const [isClicked, setIsClicked] = useState(false);

  //   const [posts, setPost] = useState([]);
  // eslint-disable-next-line no-undef
  let URL = process.env.REACT_APP_API_BASE_URL + "/media/searchbykeyword";

  const searchMedia = () => {
    const bodyParameters = {
      keyword: searchTerm,
    };
    const HEADER = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(URL, bodyParameters, HEADER)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    searchMedia();
  }, []);

  return (
    <div>
      <center>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 800,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Media"
            inputProps={{ "aria-label": "search google maps" }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={(e) => {
              e.preventDefault();
              searchMedia();
            }}
          >
            <SearchIcon />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              //  setSearchTerm("");
              setIsClicked(true);
            }}
          >
            <MicIcon />
          </IconButton>

          {isClicked && (
            <SpeechToText
              setSearchTerm={setSearchTerm}
              setIsClicked={setIsClicked}
            />
          )}
        </Paper>
      </center>
    </div>
  );
};

export default SearchMedia;
