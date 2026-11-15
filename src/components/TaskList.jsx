import { useState, useRef } from "react";
import "../App.css";
import "./TaskList.css";

function TaskList({ listOfTaskData, onUpdateTitle }) {
  let [keys, setKeys] = useState("");
  let [undoKey, setUndoKey] = useState(null);
  let [editTitle, setEditTitle] = useState(false);
  let [currentEleTitle, setCurrentEleTitle] = useState(false);
  let [emptyWarning, setEmptyWarning] = useState(false);
  let [navigation, setNavigation] = useState("All");
  let [query, setQuery] = useState("");
  let [showUndo, setShowUndo] = useState(false);
  let timerRef = useRef(null); // track the setTimeout of undo button
  const today = new Date().toISOString().split("T")[0];

  // handles the counter and get called from the jsx
  function calculateTaskRemaining() {
    let taskRemaining = listOfTaskData.filter((ele) => ele.completed === false).length;
    return <p>{taskRemaining} task left</p>
  }

  // this function triggers when we clicked on the edit button
  function handleSpan(key, title, e) {
    setKeys(key);
    setCurrentEleTitle(title);
    console.log("which button has clicked ==>", e);
  }

  // this funciton triggers when we doing something in the input barr
  function handleEdit(event) {
    let value = event.target.value;
    setEditTitle(true);
    setCurrentEleTitle(value);
  }

  function saveUpdatedTitle(e, idx, title) {
    let oldLocalStorageData = JSON.parse(localStorage.getItem("tasks"));
    if (e.code === "Enter" && currentEleTitle !== "") {
      setKeys(false); // this remove the input bar after we press enter
      oldLocalStorageData[idx].title = currentEleTitle;
      onUpdateTitle(oldLocalStorageData);
      setEmptyWarning(false);
    } else if(e.code === "Enter" && currentEleTitle === ""){
      setEmptyWarning(true);
    }

    if (e.code === "Escape") {
      setCurrentEleTitle(title);
    }

    if (e.target.textContent === "Delete") {
      setUndoKey(idx); // for specific delete button undo button will show
      setShowUndo(true); // after click on the delete button undo button shows

      timerRef.current = setTimeout(() => {
        setShowUndo(false); // undo button visible for few seconds
        let updatedData = oldLocalStorageData.filter((_, IDX) => IDX !== idx);
        onUpdateTitle(updatedData);
      }, 5000);
    }

    if (e.target.textContent === "Undo") {
      clearTimeout(timerRef.current); // cancel the setTimeout once it gets triggred but in the duration of 5 seconds
      setShowUndo(false); // remove the undo button from the UI once the undo button get clicked
    }

    // when the checkbox is get clicked means the task is completed
    if (e.target.type === "checkbox") {
      if (oldLocalStorageData[idx].completed === true) {
        oldLocalStorageData[idx].completed = false;
      } else {
        oldLocalStorageData[idx].completed = true;
      }
      onUpdateTitle(oldLocalStorageData);
    }
  }

  function handleSearch(e) {
    if (e.code === "Escape") {
      setQuery("");
    }
  }

  return (
    <div className="sectionBody">
      <label>Task List</label>

      <div className="taskLayout">
        <button onClick={() => setNavigation("All")}>All</button>
        <button onClick={() => setNavigation(false)}>Active</button>
        <button onClick={() => setNavigation(true)}>Completed</button>
        {calculateTaskRemaining()} {/* shows the counter of remaining task */}
      </div>
      <label htmlFor="Search Task">Search Task</label>
      <div className="taskLayout">
        <input id="Search Task" placeholder="Search Task..." value={query && query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} />
      </div>

      {(navigation !== "All" ? listOfTaskData.filter(e => e.completed === navigation) :
        listOfTaskData.filter(e => e.title.toLowerCase().includes(query.toLowerCase()))).map((ele, idx) => (
        <div className="taskList" key={idx}>
          <div className="taskItem">
            <input type="checkbox" onChange={(e) => saveUpdatedTitle(e, idx)} checked={ele.completed} />

            {keys === idx ?
              <>
              <input
                className="taskTitle"
                value={!editTitle ? ele.title : currentEleTitle}
                key={idx}
                onKeyDown={(e) => saveUpdatedTitle(e, idx, ele.title)}
                onChange={handleEdit} />
                {emptyWarning === true && <span>Task title cannot be empty.</span>}
              </>
              :
              <span className="taskTitle" key={idx} style={{textDecoration: ele.completed ? "line-through" : "none"}}>{ele.title}</span>}

              {ele.dueDate &&
                ele.dueDate.localeCompare(today) === -1 ? <span className="overdue-label">Overdue</span> :
                ele.title === "Fix checkout bug" && <span className="overdue-label">Overdue</span>}
            <span className="priorityTag">{ele.priority}</span>

            <span>{ele.dueDate}</span>

              <button onClick={(e) => handleSpan(idx, ele.title, e)}>Edit</button>
              {showUndo && undoKey === idx ? <button onClick={(e) => saveUpdatedTitle(e)}>Undo</button> :
                <button onClick={ele.completed ? ((e) => saveUpdatedTitle(e, idx, ele.title)) : undefined} disabled={!ele.completed}>Delete</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
