import React, { useEffect, useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

// this component needs to changed because the state logic is false
// the open state should be false initially and then onClick should set it to true which is why
// there is bugs in this component
const SpeechToText = ({ setSearchTerm, setIsClicked }) => {
  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [open, setOpen] = useState(true);
  const [listeningCounter, setListeningCounter] = useState(0);

  useEffect(() => {
    SpeechRecognition.startListening();
  }, []);

  useEffect(() => {
    setSearchTerm(transcript);
  }, [transcript]);

  //Tarmah: this component has bug because of this useEffect
  //the listening modal initially doesnt open on first click and opens on second click

  // Abdullah: Well, I just fixed it. I did it by adding a counter to the state.
  useEffect(() => {
    if (!listeningCounter) {
      setListeningCounter(listeningCounter + 1);
    }
    if (listeningCounter === 1) {
      handleClose();
    }
    console.log(listening);
  }, [listening]);

  const handleClose = () => {
    setOpen(false);
    setIsClicked(false);
  };

  if (!browserSupportsSpeechRecognition) {
    // eslint-disable-next-line react/no-unescaped-entities
    console.log("Sorry, your browser does not support speech recognition.");
  }
  return (
    <div>
      {/* // {listening ? console.log("") : handleClose()} */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Speak something to search"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              Microphone: {listening ? "Listening" : "Not Listening"}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpeechToText;
