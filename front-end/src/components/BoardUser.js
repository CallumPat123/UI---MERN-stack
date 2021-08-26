import React, { useCallback, useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import getLetters from "../services/hangul.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    console.log(getLetters());
    setLetters(getLetters());
    UserService.getUserBoard().then(
      response => {
        setContent(response.data);
      },
      error => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  // const addLetters = english => {
  //   return axios
  //     .get("http://localhost:8080/api/hangul/letters", {})
  //     .then(response => {
  //       const allLetters = response.data.createdLetters;
  //       setLetters(allLetters);
  //     })
  //     .catch(error => console.log(`Error: ${error}`));
  // };

  return (
    <div className="container">
      <h1 className="container-title">USER</h1>
      <h3>Letters</h3>
      <div className="letter-cards">
        {letters.map(letter => {
          return (
            <div className="letter-card">
              <p>{letter.english}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardUser;
