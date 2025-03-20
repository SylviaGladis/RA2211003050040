import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedId, setSelectedId] = useState('e');
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc1MzM4LCJpYXQiOjE3MjE5NzUwMzgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImU2NWQzMjU1LTliM2ItNGNjOS05OWNhLTQ5M2U3YzAyMjgwMiIsInN1YiI6ImtvbHR1cmJpbmR1c3JlZUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJBRkZPUkRNRUQiLCJjbGllbnRJRCI6ImU2NWQzMjU1LTliM2ItNGNjOS05OWNhLTQ5M2U3YzAyMjgwMiIsImNsaWVudFNlY3JldCI6Ik9ybXdmaEZtaUZaUlJaZGwiLCJvd25lck5hbWUiOiJLLkJpbmR1c3JlZSIsIm93bmVyRW1haWwiOiJrb2x0dXJiaW5kdXNyZWVAZ21haWwuY29tIiwicm9sbE5vIjoiMjFVUDFBMDUzNSJ9.sHjDo6sWtWvAHBrRKfbGqiorP-nOGcrC3pujRmTg8dg'
      const response = await axios.get(`http://20.244.56.144/test/${selectedId}`,{headers:{Authorization:`Bearer ${ACCESS_TOKEN}`}});
      const data = response.data;
      setWindowPrevState(data.windowPrevState);
      setWindowCurrState(data.windowCurrState);
      setNumbers(data.numbers);
      setAvg(data.avg);
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <div>
        <label htmlFor="numberType">Select Number Type:</label>
        <select
          id="numberType"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="e">Even</option>
          <option value="p">Prime</option>
          <option value="Y">Fibonacci</option>
          <option value="r">Random</option>
        </select>
        <button onClick={handleFetch} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Numbers'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div>
        <h2>Results</h2>
        <p><strong>Previous Window State:</strong> {windowPrevState.join(', ')}</p>
        <p><strong>Current Window State:</strong> {windowCurrState.join(', ')}</p>
        <p><strong>Numbers:</strong> {numbers.join(', ')}</p>
        <p><strong>Average:</strong> {avg}</p>
      </div>
    </div>
  );
}

export default App;
