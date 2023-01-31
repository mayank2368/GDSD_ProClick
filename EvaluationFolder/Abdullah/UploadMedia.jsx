/*
 * Contributor: Abdullah Khalid, Tarmah Bin Iqbal and Mayank Chetan Parvatia
 */

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import GenerateCategories from "./GenerateCategories";
import { selectUserToken, selectUserID } from "../redux/slices/auth";
import { CONSTANTS } from "../utils";

function UploadMedia() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [isFreeCheck, setIsFreeCheck] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [Category, SetCategory] = React.useState("");
  const [SubCategory, SetSubCategory] = React.useState("");
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const token = useSelector(selectUserToken);
  const userId = useSelector(selectUserID);

  const UploadAndDisplayImage = () => {
    return (
      <div>
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <br />

        <br />
        <input
          type="file"
          name="filename"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
    );
  };

  const addProduct = (e) => {
    e.preventDefault();

    let data = new FormData();
    console.log(selectedImage + " " + "this is image pathname");

    data.append("title", title);
    data.append("media_category", Category);
    data.append("sub_category", SubCategory);
    data.append("description", description);
    data.append("media_path", selectedImage);
    data.append("price", Price);
    data.append("is_free", isFreeCheck ? "1" : "0");
    data.append("status", CONSTANTS.PENDING);
    data.append("user_id", userId);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    // eslint-disable-next-line no-undef
    let url = process.env.REACT_APP_API_BASE_URL + "/media/create";
    axios
      .post(url, data, config)
      .then((res) => {
        console.log({ res });

        if (res.status === 200) {
          console.log("MEDIA UPLOADED SUCCESS");
          setTitle("");
          setDescription("");
          setPrice(0);
          setIsFreeCheck(true);
          setSelectedImage(null);
          SetCategory("");
          SetSubCategory("");
          setOpenSuccess(true);
        }
      })
      .catch((err) => {
        console.log("Error Upload MEDIA #######", err);
        setOpenError(true);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "20px",
        }}
      >
        <Typography variant="h4">Add New Media</Typography>
        <GenerateCategories
          SubCategory={SubCategory}
          Category={Category}
          SetCategory={SetCategory}
          SetSubCategory={SetSubCategory}
        />
        <TextField
          sx={{ width: "80%" }}
          id="demo-helper-text-aligned"
          label="Enter Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-multiline-static"
          sx={{ mt: 1 }}
          label="Description"
          multiline
          rows={8}
          value={description}
          style={{ height: "100px" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {!isFreeCheck && (
          <FormControl fullWidth sx={{ mt: 3 }}>
            <OutlinedInput
              type="number"
              value={Price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        )}
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onChange={(e) => setIsFreeCheck(e.target.checked)}
            />
          }
          label="Is free"
        />
        <form>
          <div>
            <br />
            {UploadAndDisplayImage()}
            <br />
            <button onClick={addProduct}>Submit</button>
          </div>
        </form>
      </div>
      {openSuccess && (
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Successfully added!
        </Alert>
      )}
      {openError && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          ERROR UPLOADING!
        </Alert>
      )}
    </>
  );
}

export default UploadMedia;
