import React, { Component } from "react";
import styles from "./styles.module.css";
import axios from "axios";

export default class OnDoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.fetch();
    }, 1000);
  }

  detail = (id) => {
    window.location.assign("/details/" + id);
  };

  move = async (id) => {
    const qs = require("qs");
    const newTask = {
      state: "done",
      userId: localStorage.getItem("userId"),
    };
    console.log(newTask);
    await axios
      .put(
        "https://node-api-digit.herokuapp.com/api/task/" + id,
        qs.stringify(newTask),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.fetch();
      });
  };

  fetch = () =>
    axios
      .get(
        "https://node-api-digit.herokuapp.com/api/task/user/" +
          localStorage.getItem("userId"),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ tasks: res.data });
      });

  render() {
    return (
      <div class={styles.board}>
        <div class={styles.boardlist}>
          <div class={styles.list}>OnDoing</div>
          {this.state.tasks.map((task) => {
            if (task.state === "onDoing") {
              return (
                <div className={styles.cardio}>
                  <span
                    onClick={() => {
                      this.detail(task._id);
                    }}
                  >
                    {task.title}
                  </span>
                  <span
                    className={styles.buttons}
                    onClick={() => this.move(task._id)}
                  >
                    <i class="fa-solid fa-circle-stop"></i>{" "}
                  </span>
                  <span
                    className={styles.buttons}
                    onClick={() => {
                      this.detail(task._id);
                    }}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </span>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
