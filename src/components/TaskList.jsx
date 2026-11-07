import { useEffect, useState } from "react";
import "../App.css";
import "./TaskList.css";

function TaskList() {

  // added the starter data in the localStorage at the initial
  useEffect(() => {
    (async function fetchStarterData() {
      try {
        let response = await fetch("public/tasks.json");
        let data = await response.json();
        localStorage.setItem("tasks", JSON.stringify(data));
        console.log("here ==>", data);
      } catch (err) {
        console.log("here ==>", err);
      }
    })();
  }, []);

  return (
    <div className="sectionBody">
      <label>Task List</label>

      <div className="taskLayout">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <div className="taskLayout">
        <input placeholder="Search Task..." />
        <button>Search</button>
      </div>

      <div className="taskList">
        <div className="taskItem">
          <input type="checkbox" />

          <span className="taskTitle">Learn React</span>

          <span className="priorityTag">High</span>

          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
