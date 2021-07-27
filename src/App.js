import React from 'react';
import Vote from './Components/Vote';
import Result from './Components/Result';

function App() {
  return (
    <div className="container">
      <h1>Welcome to the voting app!</h1>
      <Vote />
      <Result />
    </div>
  );
}

export default App;
