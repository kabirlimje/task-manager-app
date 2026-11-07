import "../App.css";

function TaskAdder() {
  return (
    <div className="sectionBody">
      <label>Add Task</label>
      <div className="taskLayout">
        <input placeholder="Add the task..."/>
        <button>ADD</button>
      </div>
      <div>
        <button>low</button>
        <button>medium</button>
        <button>high</button>
        <input type="date" />
      </div>
    </div>
  )
}


export default TaskAdder;
