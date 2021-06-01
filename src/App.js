import React from 'react';
import './App.css';
import Todo from './todo'
import Count from './count';
function App() {
  return (
    <div className="App">
      <Todo/>
      <hr/>
      <Count/>
    </div>
  );
}

export default App;
