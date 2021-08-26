import React, { useState, useRef, useEffect } from "react";
import serv from "../services/hangul.service";
import { useDispatch, useSelector } from "react-redux";
import { addLetter } from "../actions/hangul";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const AdminUser = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [content, setContent] = useState("");
  const [letters, setLetters] = useState([]);
  const [letter, setLetter] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    serv.getLetters().then(response => {
      setLetters(response);
    });
  }, []);
  const onChangeLetter = e => {
    const letter = e.target.value;
    setLetter(letter);
  };

  const handleRegister = e => {
    e.preventDefault();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(addLetter(letter))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form class="form" onSubmit={handleRegister} ref={form}>
          <div>
            <div className="form-group">
              <label htmlFor="username">Add New Letter</label>

              <Input
                type="text"
                className="form-control"
                name="letter"
                value={letter}
                onChange={onChangeLetter}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Add</button>
            </div>
          </div>

          {message && (
            <div className="message form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div class="letters-container">
          <div className="letters-title">
            <h3>Current Letters</h3>
          </div>
          <div className="letter-cards">
            {letters.map(letter => {
              return (
                <div className="letter-card">
                  <button className="remove-button">
                    <FontAwesomeIcon className="cross-icon" icon={faTimes} />
                  </button>
                  <p>{letter.english}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
