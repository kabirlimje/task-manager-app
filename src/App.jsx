import { useEffect, useState } from 'react'
import TaskAdder from './components/TaskAdder';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  let [loading, setLoading] = useState(true);
  let [retry, setRetryButton] = useState(false);
  let [errorStatus, setErrorStatus] = useState(null);
  let [customErrorDisplay, setCustomErrorDisplay] = useState(false);


  async function fetchStarterData() {
    try {
      let response = await fetch("https://httpstat.us/404");
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      } else {
        setCustomErrorDisplay(response.ok);
      }
      let data = await response.json();
      localStorage.setItem("tasks", JSON.stringify(data));
      setTimeout(() => {
        setErrorStatus(null);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setTimeout(() => {
        setErrorStatus(err.message)
        setRetryButton(true);
      }, 2000);
    }
  };

  // when click on the retry button it should refetched the data load appears and fetch button gone
  // and according to response (if error gets retry button display again)
  function handleRetryButton() {
    setRetryButton(false);
    fetchStarterData();
  }

  useEffect(() => {
    fetchStarterData();
  }, []);

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
          <TaskAdder />
          <TaskList />
        </>)
      }
    </>
  )
}

export default App;
