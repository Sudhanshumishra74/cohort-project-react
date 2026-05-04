import { useEffect, useState } from "react";

function App() {
  const [jokes, setJokes] = useState([]);
  const [index, setIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJokes = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes"
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setJokes(data.data.data);
      setIndex(0); // reset to first joke
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const nextJoke = () => {
    if (index < jokes.length - 1) {
      setIndex(index + 1);
    } else {
      // 🔥 fetch new batch when finished
      fetchJokes();
    }
  };

  const copyJoke = () => {
    navigator.clipboard.writeText(jokes[index]?.content || "");
    alert("Copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      
      <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-xl text-center">
        
        <h1 className="text-2xl font-bold mb-4">
          😂 Joke Viewer
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && jokes.length > 0 && (
          <p className="text-gray-800 mb-6">
            {jokes[index].content}
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={nextJoke}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Next Joke
          </button>

          <button
            onClick={copyJoke}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;