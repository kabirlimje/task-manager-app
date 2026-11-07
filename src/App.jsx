// import { useState } from 'react'
import TaskAdder from './components/TaskAdder';
import TaskList from './components/TaskList';
import './App.css';

function App() {

  return (
    <>
      <h1>Task Manager App</h1>
      <TaskAdder />
      <TaskList />
    </>
  )
}

export default App;
