import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  //ip data
  const [ipData, setIpData] = useState(null);
  //loading 
  const [loading, setLoading] = useState(false);

  //error 
  const [error, setError] = useState(null);

  async function fetchIpData(searchTerm) {
    setLoading(true);
    setError(null);
    try {
      const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.IPIFY_KEY}&ipAddress=${searchTerm}`;
      //send request, and wait 
      const res = await fetch(url);
      //throw erro , send to catch
      if (!res.ok) throw new Error('API request failed');

      //parse as json
      const data = await res.json();

      setIpData(data);
    } catch (err) {
      setError(err.message);

    } finally {
      //done loading
      setLoading(false);
    }
  }
  //this only runs when the search bar goes empty, data returns
  useEffect(() => {
    fetchIpData('');
  }, []);


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
      {loading && <p>Loading!</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {ipData && (
        <div classname="results">
          <p><bold>IP:</bold>{ipData.ip}</p>
          <p><bold>Location:</bold>{ipData.location?.city}, {ipData.location?.country}</p>
          <p><bold>Timezone:</bold> {ipData.location?.timezone}</p>
          <p><bold>ISP:</bold>{ipData.isp}</p>
        </div>
      )}
    </div>
  );
}

export default App;