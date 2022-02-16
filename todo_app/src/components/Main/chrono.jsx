import React, { Component } from "react";
import styles from "./styles.module.css";
import axios from "axios";

export default class Done extends Component {
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
          <div class={styles.list}>Done</div>
          {this.state.tasks.map((task) => {
            if (task.state === "done") {
              return (
                <div
                  className={styles.cardioDone}
                  onClick={() => {
                    this.detail(task._id);
                  }}
                >
                  {task.title}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
