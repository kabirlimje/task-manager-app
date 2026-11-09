import { useState } from "react";
import "../App.css";
import "./TaskAdder.css";

function TaskAdder({ passData }) {
  let [error, setError] = useState(null);

  // contains single task at a time
  let [taskData, setTaskData] = useState({
    id: "",
    title: "",
    priority: "Medium", // set default priority
    dueDate: "",
    completed: false
  });

  // title, priority, dueDate
  function taskDataManager(e) {
    const key = e.target.name;
    const value = e.target.value;
    console.log("from the taskDataManger function ", typeof key);

    // as user typing the title we have to remove the error of title validation
    if (key === 'title') setError("");

    // here we are adding data from the UI
    setTaskData((prev) => ({
      ...prev,
      ['id']: JSON.parse(localStorage.getItem("tasks").length + 1),
      [key]: value,
    }));
  }

  function titleValidation() {
    if (taskData.title.trim()) {
      passData(taskData); // single user data get passed to the App component
    } else {
      setError("Task title is required. Please enter a title.");
    }
  }

  function handleSubmit(e) {
    // due to this we can stop browser to reload the page and reset the state (which is its default behaviour)
    e.preventDefault();
    titleValidation();
  }

  return (
    <div className="sectionBody">
      <label>Task Title</label>
      {error && <h3>{error}</h3>}
      <form className="taskLayout" onSubmit={handleSubmit}>
        {/* the reason behind to add the onKeyDown ot the input is that when we press enter we can submit the form */}
        <input name="title" placeholder="Enter task title..." onChange={taskDataManager} />
        {/* HERE WHEN I CLICK THIS BUTTON THE DATA WILL PASS TO THE APP COMPONENT */}
        <button type="submit">ADD</button>
      </form>
      <div>
        <button name = "priority" value = "Low" onClick={taskDataManager} className={taskData.priority === "Low" ? "selectedButton" : ""}>low</button>
        <button name = "priority" value = "Medium" onClick={taskDataManager} className={taskData.priority === "Medium" ? "selectedButton" : ""}>medium</button>
        <button name = "priority" value = "High" onClick={taskDataManager} className={taskData.priority === "High" ? "selectedButton" : ""}>high</button>
        <input name = "dueDate" type="date" onChange={taskDataManager} /><span>optional</span>
      </div>
    </div>
  )
}

export default TaskAdder;
