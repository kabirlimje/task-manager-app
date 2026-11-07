import { useEffect } from "react";
import "../App.css";
import "./TaskList.css";

function TaskList() {

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
