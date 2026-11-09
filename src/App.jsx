import { useEffect, useState } from 'react'
import TaskAdder from './components/TaskAdder';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  let [retry, setRetryButton] = useState(false);
  let [errorStatus, setErrorStatus] = useState(null);
  let [customErrorDisplay, setCustomErrorDisplay] = useState(false);

  // create because we wants the data from the localStorage
  let [dataFromLocalStorage, setDataFromLocalStorage] = useState(false);

  // lazy initialization -: which helps my state to survive the reload
  // runs at #1 render
  let [dataOfTaskList, setDataOfTaskList] = useState(() => {
    try {
      let savedLocalStorage = localStorage.getItem("tasks");
      if (savedLocalStorage === null) {
        return null;
      } else {
        return JSON.parse(savedLocalStorage);
      }
    } catch {
      return null;
    }
  });

  let [loading, setLoading] = useState(true);


  async function fetchStarterData() {
    try {
      let response = await fetch("./tasks.json");

      if (!response.ok) {
        // if we get the actual error if thrown it to the catch
        throw new Error(`HTTP error ${response.status}`);
      } else {
        // reason ? in some case if the URL is wrong then aslo we get the response.ok === true so we add our custom error
        setCustomErrorDisplay(response.ok);
      }

      // JSON data
      let data = await response.json();

      // add the starter code
      setDataOfTaskList(data);

      // loading behaviour
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (err) {
      // error + retry button behaviour
      setTimeout(() => {
        setErrorStatus(err.message)
        setRetryButton(true);
      }, 2000);
    }
  }

  // this make sures that the fetching process happens only once when the component mounts
  useEffect(() => {
    if (dataOfTaskList === null) {
      fetchStarterData();
    }
  }, []);

  // when click on the retry button it should refetched the data load appears and fetch button gone
  // and according to response (if error gets retry button display again)
  function handleRetryButton() {

    // if the data fetched successfully we disappers the retry button
    setRetryButton(false);

    // try to fetch the data after we face the error
    fetchStarterData();
  }

  // this add previous and current tasks of the user in the "dataOfTaskList"
  function addTask(currentTask) {
    setDataOfTaskList((prev) => [...prev, currentTask]);
  }

  // when the "dataOfTaskList" got changed we have add that data into the "localStorage"
  // and also we have to add the localStorage 'parse' data into the "dataFromLocalStorage"
  useEffect(() => {
    if (dataOfTaskList !== null) {
      localStorage.setItem("tasks", JSON.stringify(dataOfTaskList));
      setDataFromLocalStorage(JSON.parse(localStorage.getItem("tasks")));
      setLoading(false);
    }
  }, [dataOfTaskList]);

  return (
    <>
      {
        loading ?
          (<div className="loader-wrap">
            {retry ?
              <>
                {customErrorDisplay ? <h1>Oops! Something went wrong.</h1> : <h1>{errorStatus}</h1>}
              <button onClick={handleRetryButton}>Retry</button>
            </> :
              <div className="spinner" role="status" aria-label="Loading"></div>}
          </div>):
        (<>
          <h1>Task Manager App</h1>
          <TaskAdder passData={addTask} />
          <TaskList listOfTaskData={dataFromLocalStorage} />
        </>)
      }
    </>
  )
}

export default App;
