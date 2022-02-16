import React, { Component } from "react";
import styles from "./styles.module.css";
import axios from "axios";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      input: "",
    };
  }

  componentDidMount() {
    this.fetch();
  }

  detail = (id) => {
    if (localStorage.getItem("is_admin") === "no") {
      window.location.assign("/details/" + id);
    } else {
      window.location.assign("/seebyadmin/" + id);
    }
  };

  move = async (id) => {
    const qs = require("qs");
    const newTask = {
      state: "onDoing",
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

  //   add = () => {};
  handleChange = (e) => {
    this.setState({ input: e.target.value });
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

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.input);
    const qs = require("qs");
    const newTask = {
      title: this.state.input,
      userId: localStorage.getItem("userId"),
    };
    console.log(newTask);
    await axios
      .post(
        "https://node-api-digit.herokuapp.com/api/task",
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
  render() {
    return (
      <div class={styles.board}>
        <div class={styles.boardlist}>
          <div class={styles.list}>ToDo</div>
          {this.state.tasks.map((task) => {
            if (task.state === "todo") {
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
                    <i class="fa-solid fa-circle-play"></i>
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
          <form className={styles.cardif} onSubmit={this.handleSubmit}>
            <input
              type="text"
              className={styles.cardia}
              placeholder="Add another task"
              required
              value={this.state.input}
              onChange={(e) => this.handleChange(e)}
            />
            <button type="submit" className={styles.cardib}>
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}
