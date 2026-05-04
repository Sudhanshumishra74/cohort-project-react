import { useEffect, useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const fetchVideos = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/youtube/videos?page=${pageNumber}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // ✅ Correct mapping
      setVideos(data.data.data);
      setPage(data.data.page);
      setHasNext(data.data.nextPage);
      setHasPrev(data.data.previousPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(1);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">YouTube Clone</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Video Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => {
          const v = video.items;
          const snippet = v?.snippet;

          return (
            <div
              key={v?.id}
              className="cursor-pointer hover:scale-105 transition"
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${v.id}`,
                  "_blank"
                )
              }
            >
              {/* Thumbnail */}
              <img
                src={
                  snippet?.thumbnails?.high?.url ||
                  snippet?.thumbnails?.medium?.url ||
                  "https://via.placeholder.com/300"
                }
                alt={snippet?.title}
                className="w-full h-48 object-cover rounded-xl"
              />

              {/* Info */}
              <div className="flex mt-3 gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

                <div>
                  <h2 className="text-sm font-semibold line-clamp-2">
                    {snippet?.title}
                  </h2>

                  <p className="text-gray-600 text-xs mt-1">
                    {snippet?.channelTitle}
                  </p>

                  <p className="text-gray-500 text-xs">
                    {v?.statistics?.viewCount
                      ? `${Number(
                          v.statistics.viewCount
                        ).toLocaleString()} views`
                      : "No views"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => fetchVideos(page - 1)}
          disabled={!hasPrev}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2 font-semibold">
          Page {page}
        </span>

        <button
          onClick={() => fetchVideos(page + 1)}
          disabled={!hasNext}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;