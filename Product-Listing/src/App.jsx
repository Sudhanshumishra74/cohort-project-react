import { useState, useEffect } from 'react'


function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

const fetchProducts = async () => {
  try {
    const response = await fetch('https://api.freeapi.app/api/v1/public/randomproducts')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    setProducts(data.data.data)
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  fetchProducts()
}, [])


  return (
    <>
    <h1 className="text-3xl font-bold mb-6 text-center">Product Listing</h1>

{loading && <p className="text-center text-gray-500">Loading...</p>}
{error && <p className="text-center text-red-500">Error: {error}</p>}

{!loading && !error && (
  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
      >
        {/* Product Image */}
        <img
          src={product.thumbnail} // make sure your API provides this
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* Product Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">
            {product.name}
          </h2>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <p className="text-xl font-bold text-blue-600">
            ${product.price}
          </p>
        </div>
      </div>
    ))}
  </div>
)}
     
      
  
    </>
  )
}

export default App
