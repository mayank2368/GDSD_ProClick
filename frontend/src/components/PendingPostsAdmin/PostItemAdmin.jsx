/*
Contributor: Abdullah Khalid and Tarmah Bin Iqbal and bilal ahmad
*/

import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../redux/slices/auth";
import { CONSTANTS } from "../../utils";

const PostItem = ({
  title,
  description,
  mediaPath,
  setLoading,
  media_id,
  loading,
}) => {
  const token = useSelector(selectUserToken);
  //const [rerender, setRerender] = React.useState(false);

  let IMAGE_API_APPROVE =
    process.env.REACT_APP_API_BASE_URL + "/user/approvemediabyadmin";
  function approvePost(e) {
    e.preventDefault();
    setLoading(true);

    const bodyParameters = {
      status: CONSTANTS.APPROVED,
      media_id: media_id,
    };

    axios
      .post(IMAGE_API_APPROVE, bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  }
  const deletePost = (id) => {
    console.log("Button Pressed", media_id);
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
  };

  let IMAGE_API = process.env.REACT_APP_IMAGE_URL;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={IMAGE_API + mediaPath}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <LoadingButton
          size="small"
          color="secondary"
          onClick={approvePost}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Approve
        </LoadingButton>
      </CardActions>
      <CardActions>
        <LoadingButton
          size="small"
          color="secondary"
          onClick={() => deletePost(media_id)}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          DELETE
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default PostItem;
