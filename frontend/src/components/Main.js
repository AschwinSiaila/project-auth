import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "utils/constants";
import thoughts from "reducers/thoughts";

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("/thoughts"), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(thoughts.actions.setItems(data.response));
      });
  }, [accessToken, dispatch]);

  return (
    <div>
      <h1>Protected happy thoughts:</h1>
      {thoughtsItems.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))}
    </div>
  );
};

export default Main;
