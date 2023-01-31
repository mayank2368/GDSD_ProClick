/*
 * Contributor: Ahmed Hassan
 * Contributor: Hamza Mazhar
 */

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "font-awesome/css/font-awesome.min.css";
import { UsersContainer } from "../../components/NavBar/UserContainer/UserContainer";
import "./Chat.css";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import UIfx from "uifx";
import bellAudio from "../../sounds/accomplished-579.mp3";
import bg from "../../img/bg.png";
import ScrollToBottom from "react-scroll-to-bottom";
import { Message } from "../Message/Message";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const bell = new UIfx(bellAudio);
const userData = JSON.parse(localStorage.getItem("user"));
const senderId = userData?.user?.id || null;

// eslint-disable-next-line no-undef
const API_URL = process.env.REACT_APP_API_BASE_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Chat = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  let [searchParams] = useSearchParams();
  let socket = useRef(null);
  // TODO set server url using env
  // eslint-disable-next-line no-undef
  const ENDPOINT = process.env.REACT_APP_CHAT_URL;
  function onMessageChange(e) {
    setMessage(e.target.value);
  }

  useEffect(() => {
    const getMessages = async () => {
      try {
        const conversationId = searchParams.get("conversationId");
        const bodyParameters = {
          conversationId: conversationId,
        };
        // prettier-ignore
        const res = await axios.post(API_URL + "/chat/userconversationbyid", bodyParameters);
        if (res.status === 200) {
          console.log("here all the messages", res.data.result.record);
          setMessages((msgs) => [...msgs, ...res.data.result.record]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    socket.current = io(ENDPOINT, {
      autoConnect: true,
    });
    const myName = searchParams.get("name");
    const myRoom = searchParams.get("room");
    setName(myName);
    socket.current.emit(
      "join",
      { name: myName, room: myRoom, senderId: senderId },
      (error) => {
        if (error) {
          alert(error);
          window.location.href = "/";
        }
      }
    );
  }, [senderId]);

  useEffect(() => {
    const myName = searchParams.get("name");
    let date = "";
    socket.current.on("message", (message) => {
      if (message.time) {
        let newDate = new Date(message.time).toLocaleDateString("uk-UA");
        if (date !== newDate) {
          date = newDate;
          let dateText = date;
          if (date === new Date().toLocaleDateString("uk-UA")) {
            dateText = "Today";
          }
          setMessages((msgs) => [
            ...msgs,
            { user: "date", text: dateText, name: myName },
          ]);
        }
      }

      // Check whether to Play Sound on Msg Received - Play when msg is not old and msg sender is not this client or admin/date msg.
      if (
        // !message.old &&
        message.user !== myName.toLowerCase() &&
        message.user !== "admin" &&
        message.user !== "date"
      ) {
        bell.play();
        setOpen(true);
      }
      socket.current.on("sendMessageNotification", (messageNotification) => {
        console.log(
          "+++++++++here get the notification of the message",
          messageNotification
        );
      });
      setMessages((msgs) => [...msgs, message]);
    });

    socket.current.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [searchParams.get("senderId")]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const myName = searchParams.get("name");
    // const senderId = searchParams.get("senderId");
    const conversationId = searchParams.get("conversationId");

    if (message) {
      let time = new Date();
      let msg = { text: message, time: time, name: myName };
      socket.current.emit("sendMessage", msg, () => setMessage(""));
      //TODO conversation ID need to be set here logic
      try {
        // const getConversationIdRes = await axios.get(
        //   API_URL + "/conversation/" + senderId + "/" + buyerId
        // );
        // if (getConversationIdRes.status === 200) {
        // console.log(getConversationIdRes.data.result.record.id);
        // const conversationId = getConversationIdRes.data.result.record.id;
        // here same logic applied to store the unique conversation id from url
        let postedMsgdata = {
          conversationId: conversationId,
          text: message,
          senderId: senderId,
          name: name,
        };
        const res = await axios.post(API_URL + "/chat", postedMsgdata);
        console.log("+++++++", res);
        // } else {
        //   console.log("++++++++here will handle the unconditional error");
        // }
      } catch (err) {
        console.log(err);
      }
      // here socket also called
    }
  };
  // const Alert =
  //   React.forwardRef <
  //   HTMLDivElement >
  //   function Alert(props, ref) {
  //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  //   };
  const handleClose = () => {
    setOpen(false);
  };
  console.log("+++++++++++++", open);
  return (
    <div className="outerContainer">
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => {
          setTimeout(() => {
            handleClose();
          }, 2000);
        }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <div className="innerContainer">
        <UsersContainer users={users} myname={name} socket={socket.current} />
        <div className="container">
          <div className="infoBar">
            <div className="leftInnerContainer">{/*<h3>{room}</h3>*/}</div>
          </div>
          <div
            className="messagesContainer"
            style={{
              backgroundImage: `linear-gradient(to bottom, #ffb09421, #ffb0941f),url(${bg})`,
            }}
          >
            <ScrollToBottom
              className="messages"
              followButtonClassName="stickToBottomButton"
              debug={false}
            >
              {messages.map((msg, i) => (
                <div key={i}>
                  <Message message={msg} name={name} />
                </div>
              ))}
            </ScrollToBottom>
          </div>
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="Type a Message"
              value={message}
              onChange={onMessageChange}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            />
            <div className="sendButton">
              <IconButton
                color="inherit"
                aria-haspopup="true"
                onClick={(e) => sendMessage(e)}
                disabled={message == null || message === ""}
              >
                <SendIcon />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
