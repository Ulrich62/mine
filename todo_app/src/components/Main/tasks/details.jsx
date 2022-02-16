import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import styles from "../Signup/styles.module.css";
import styles from "../admins/body.module.css";
import Navbar from "../navbars/navbar";

const Update = () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf("/") + 1);

  fetch();

  fetch = async () =>
    await axios
      .get("https://node-api-digit.herokuapp.com/api/task/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  //  this.state = {
  //    tasks: [],
  //  };

  const [data, setData] = useState({
    title: "",
    content: "",
    userId: localStorage.getItem("userId"),
  });
  console.log(data);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const deleteTask = async (e) => {
    try {
      const url = "https://node-api-digit.herokuapp.com/api/task/" + id;
      const { data: res } = await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://node-api-digit.herokuapp.com/api/task/" + id;
      const { data: res } = await axios
        .put(url, data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.fetch();
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.main_container}>
      <Navbar />
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.right}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form_container}>
                <h1>Update Your Task Here</h1>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  defaultValue={data.title}
                  required
                  className={styles.input}
                />
                <textarea
                  type="text"
                  placeholder="Content"
                  name="content"
                  onChange={handleChange}
                  defaultValue={data.content}
                  required
                  className={styles.input}
                />
                {error && <div className={styles.error_msg}>{error}</div>}
              </div>

              <button className={styles.green_btn}>Save</button>

              <button type="button" className={styles.blue_btn}>
                Start
              </button>

              <button
                type="button"
                onClick={deleteTask}
                className={styles.red_btn}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
