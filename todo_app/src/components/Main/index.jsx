import styles from "./tasks/styles.module.css";
import Todo from "./tasks/todo";
import Done from "./tasks/done";
import OnDoing from "./tasks/onDoing";
import Navbar from "./navbars/navbar";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col">
            <Todo />
          </div>
          <div className="col">
            <OnDoing />
          </div>
          <div className="col">
            <Done />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
