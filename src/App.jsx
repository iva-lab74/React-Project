import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');

  //form
  function handleSubmit(e) {
    e.preventDefault();

    //see what its doing 
    console.log('searching:', query);
  }


  return (
    <div className="app">
      <h1>IP Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search for any IP address" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>

  );
}

export default App;