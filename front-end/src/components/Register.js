import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validStudentNumber = value => {
  if (value.length !== 8) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid student Number.
      </div>
    );
  }
};
const validEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [validUser, setValidUser] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeUwaPassword = e => {
    const password = e.target.value;
    password === "UWA" ? setValidUser(true) : setValidUser(false);
  };
  const onChangeStudentNumber = e => {
    const number = e.target.value;
    setStudentNumber(number);
  };

  const onChangeUsername = e => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = e => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = e => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, studentNumber, email, password))
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
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form class="form" onSubmit={handleRegister} ref={form}>
          {!successful && !validUser ? (
            <div>
              <label htmlFor="username">UWA Password</label>
              <Input
                type="text"
                className="form-control"
                name="uwa-password"
                onChange={onChangeUwaPassword}
                validations={[required]}
              />
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>

                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Student Number</label>
                <Input
                  type="text"
                  className="form-control"
                  name="studentNumber"
                  value={studentNumber}
                  onChange={onChangeStudentNumber}
                  validations={[required, validStudentNumber]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
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
      </div>
    </div>
  );
};

export default Register;
