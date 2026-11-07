import { useState, useEffect } from "react";
import "../App.css";

function TaskAdder({passData}) {
  let [taskData, setTaskData] = useState({
    id: JSON.parse(localStorage.getItem("tasks")).length + 1,
    title: "",
    priority: "",
    dueDate: "",
    completed: false
  });

  // blueprint of data
  // {
  //   "id": 1,
  //   "title": "Set up project repo",
  //   "priority": "High",
  //   "dueDate": "2026-01-10",
  //   "completed": true
  // }

  // useEffect(() => {
  //   console.log("here is the added one", taskData);
  // }, [taskData]);

  // title, priority, dueDate
  function taskDataManager(e) {
    const key = e.target.name;
    const value = e.target.value;
    setTaskData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="sectionBody">
      <label>Add Task</label>
      <div className="taskLayout">
        <input name="title" placeholder="Add the task..." onChange={taskDataManager} />
        {/* HERE WHEN I CLICK THIS BUTTON THE DATA WILL PASS TO THE APP COMPONENT */}
        <button onClick={() => passData(taskData)}>ADD</button>
      </div>
      <div>
        <button name = "priority" value = "Low" onClick={taskDataManager}>low</button>
        <button name = "priority" value = "Medium" onClick={taskDataManager}>medium</button>
        <button name = "priority" value = "High" onClick={taskDataManager}>high</button>
        <input name = "dueDate" type="date" onChange={taskDataManager} />
      </div>
    </div>
  )
}


export default TaskAdder;
