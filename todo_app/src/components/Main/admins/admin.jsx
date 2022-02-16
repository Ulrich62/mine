import React, { Component } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbars/navbar";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  getTask = (id) => {
    window.location.assign("/usertask/" + id);
    localStorage.setItem("userId", id);
  };

  componentDidMount() {
    this.fetch();
  }

  deleteUser = async (id) => {
    try {
      const url = "https://node-api-digit.herokuapp.com/api/auth/" + id;
      const { data: res } = await axios
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          this.fetch();
        });
    } catch (error) {}
  };

  // getTask(){
  //     this.navigate('/usertask')
  // }

  fetch = async () =>
    await axios
      .get("https://node-api-digit.herokuapp.com/api/auth", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data });
      });

  render() {
    return (
      <div className={styles.main_container}>
        <Navbar />
        <div class="main">
          <div class="car">
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Nationality</th>
                    <th scope="col">Speciality</th>
                    <th scope="col">Birthdate</th>
                    <th scope="col">Is Admin?</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                {this.state.users.map((user) => {
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{user.firstName}</th>
                        <td>{user.lastName}</td>
                        <td>{user.nationality}</td>
                        <td>{user.speciality}</td>
                        <td>{user.birthday}</td>
                        <td>{user.is_admin}</td>
                        <td>
                          &nbsp;
                          <button
                            class="btn btn-success"
                            onClick={() => this.getTask(user._id)}
                          >
                            View Tasks
                          </button>
                          &nbsp; &nbsp;
                          <button
                            class="btn btn-danger"
                            onClick={() => this.deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
