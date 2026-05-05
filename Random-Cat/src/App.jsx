import { useEffect, useState } from "react";

function App() {
  const [cat, setCat] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCat = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/cats/cat/random"
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // ✅ correct fields
      setCat(data.data.image);
      setInfo(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
        
        <h1 className="text-2xl font-bold mb-4">
          🐱 Random Cat Viewer
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && cat && (
          <>
            <img
              src={cat}
              alt={info?.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            {/* Extra Info (makes your project stand out) */}
            <h2 className="text-lg font-semibold">
              {info?.name}
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              {info?.origin}
            </p>

            <p className="text-sm text-gray-700 mb-4">
              {info?.description}
            </p>
          </>
        )}

        <button
          onClick={fetchCat}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "New Cat"}
        </button>
      </div>
    </div>
  );
}

export default App;