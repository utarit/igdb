import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import GameCard from './components/GameCard';

function App() {
  const [data, setData] = useState([]);

  async function fetchAPI() {
    const result = await axios(
      'http://localhost:5000/api/v1/games/',
    );
    console.log(result.data.data);
    setData(result.data.data);
  }
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="App">
      <header className="p-3 bg-purple-500">
        <ul className="flex items-center">
          <li className="mr-3">
            <p className="border p-2 rounded">IGDb</p>
          </li>
          <li className="mr-3">
            <p className="">International Game Database</p>
          </li>
        </ul>
      </header>
      <div>
        {data.length === 0 ? <p>Loading...</p> : data.map(game =>
          <GameCard key={game._id} game={game} />
        )}
      </div>
    </div>
  );
}

export default App;
