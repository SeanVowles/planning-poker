import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Planning Poker!
        </h1>
          </header>

          <div>
              <h2>Socket IO Information</h2>

              <p>Your user ID: <strong>...dynamically insert UUI</strong></p>
              <p>Users online: <strong>...get the users length</strong></p>
              <p>Socket ID: <strong>...get the socket id</strong></p>
          </div>
    </div>
  );
}

export default App;
