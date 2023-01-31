/*
 * Contributor: Ahmed Hassan
 *Contributor : Hamza Mazhar
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageBox from "./MessageBox";

// eslint-disable-next-line no-undef
const APIENDPOINT = process.env.REACT_APP_API_BASE_URL;
function Conversation() {
  const [buyerList, setBuyerList] = useState([]);

  useEffect(() => {
    const sellerId = JSON.parse(localStorage.getItem("user"))?.user.id;
    // prettier-ignore
    const getConversations = async () => {
      // prettier-ignore
        const bodyParameters = {
          // prettier-ignore
          seller_id: sellerId,
        };
        // prettier-ignore
      const res = await axios.post(
        APIENDPOINT + `/conversation/uniqueConversation`, bodyParameters
      );
      setBuyerList(res.data.result.record);
      console.log(res.data);
    };
    getConversations();
    console.log(sellerId);
  }, []);

  const handleRouteChange = (data) => {
    console.log(data);
    let userData = JSON.parse(localStorage.getItem("user"));
    console.log("+++++++", userData);
    if (userData) {
      let path = `/chat/?name=${userData.user.first_name}&room=${data.id}&senderId=${userData.user.id}&conversationId=${data.id}`;
      var win = window.open(path, "_blank");
      win.focus();
    }
  };
  return (
    <div>
      {console.log(buyerList)}
      {buyerList?.map((data, idx) => {
        return (
          <div key={idx}>
            <button onClick={() => handleRouteChange(data)}>
              <MessageBox name={data.buyerData} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Conversation;
