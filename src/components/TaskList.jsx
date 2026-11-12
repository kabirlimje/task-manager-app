import { useState } from "react";
import "../App.css";
import "./TaskList.css";
import { useEffect } from "react";

function TaskList({ listOfTaskData, onUpdateTitle }) {
  let [keys, setKeys] = useState("");
  let [editTitle, setEditTitle] = useState(false);
  let [currentEleTitle, setCurrentEleTitle] = useState(false);
  let [emptyWarning, setEmptyWarning] = useState(false);

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
      let updatedData = oldLocalStorageData.filter((ele, IDX) => IDX !== idx);
      onUpdateTitle(updatedData);
      setConfirmation(false);
      console.log("when delete button got clicked ==>", updatedData)
      console.log("see the oldLocalStorage ==>", oldLocalStorageData);
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

  useEffect(() => {
    console.log("old localStorage ==>", JSON.parse(localStorage.getItem("tasks")));
  }, [listOfTaskData])

  useEffect(() => {
    console.log("old localStorage ==>", JSON.parse(localStorage.getItem("tasks")));
  }, []);

  // problem fix
  // 1) solve the edit button behaviour
  //   - input behaviour solved
  //   - now editing part solved
  //
  // 2) when entering input data also solved
  // 3) after click on the enter button edited data also added into the localStorage even it survives the reload
  // 4) after click on the enter button input get converted into span
  // 5) added the empty title validation and escape button behaviour
  // 6) added the delete button behaviour
  //    - check box awareness
  //    - remove from localStorage

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

      {listOfTaskData.map((ele, idx) => (
        <div className="taskList">
          <div className="taskItem">
            <input type="checkbox" onClick={(e) => saveUpdatedTitle(e, idx)} checked={ele.completed} />

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

            <span className="priorityTag">{ele.priority}</span>

            <span>{ele.dueDate}</span>

            <button onClick={(e) => handleSpan(idx, ele.title, e)}>Edit</button>
            <button onClick={ele.completed && ((e) => saveUpdatedTitle(e, idx, ele.title))} disabled={!ele.completed}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
