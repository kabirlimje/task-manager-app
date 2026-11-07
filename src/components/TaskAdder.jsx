import "../App.css";

function TaskAdder() {
  return (
    <div className="sectionBody">
      <label>Add Task</label>
      <div className="taskLayout">
        <input placeholder="Add the task..."/>
        <button>ADD</button>
      </div>
    </div>
  )
}


export default TaskAdder;
