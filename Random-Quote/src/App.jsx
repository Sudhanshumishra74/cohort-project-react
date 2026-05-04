import { useState } from "react";

const App = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomQuote = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/quotes/quote/random"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await res.json();

      console.log(data); // 

      setQuoteData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      
      <button
        onClick={getRandomQuote}
        className="bg-green-500 px-4 py-2 rounded mb-6"
      >
        Get Random Quote
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {quoteData && (
        <div className="bg-gray-800 p-6 rounded max-w-md text-center">
          <p className="italic">"{quoteData.content}"</p>
          <h3 className="mt-4 font-bold">— {quoteData.author}</h3>
        </div>
      )}
    </div>
  );
};

export default App;