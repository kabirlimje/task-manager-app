import "../App.css";
import "./TaskList.css";

function TaskList({ listOfTaskData }) {

  // handles the counter and get called from the jsx
  function calculateTaskRemaining() {
    let taskRemaining = listOfTaskData.filter((ele) => ele.completed === false).length;
    return <p>{taskRemaining} task left</p>
  }

  return (
    <div className="sectionBody">
      <label>Task List</label>

      <div className="taskLayout">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
        {calculateTaskRemaining()} {/* shows the counter of remaining task */}
      </div>
      <div className="taskLayout">
        <input placeholder="Search Task..." />
        <button>Search</button>
      </div>

      {listOfTaskData.map((ele) => (
        <div className="taskList">
          <div className="taskItem">
            <input type="checkbox"/>

            <span className="taskTitle">{ele.title}</span>

            <span className="priorityTag">{ele.priority}</span>

            <span>{ele.dueDate}</span>

            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
