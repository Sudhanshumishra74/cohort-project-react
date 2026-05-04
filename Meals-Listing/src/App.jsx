import { useState, useEffect } from 'react'


function App() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  
   
    const fetchMeal =  async () => {
 
      setLoading(true);
      setError(null)

      try {

        const food =  await fetch("https://api.freeapi.app/api/v1/public/meals")

        if(!food.ok){
          throw new Error("Failed to fetch meals")
        }

        const data =  await food.json()
        setMeals(data.data.data)
        
      } catch (err) {
         setError(err.message)
      } finally{
        setLoading(false)
      }




    }

   useEffect(() => {
    fetchMeal()
   }, [])


  
 

 return(
 <>
  <div className="min-h-screen p-6 bg-gray-900">
    
    <h1 className="text-amber-50 text-4xl text-center mb-6 font-bold">
      Menu Card
    </h1>

    <div className="flex justify-center mb-6">
      <button
        onClick={fetchMeal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Meals Menu
      </button>
    </div>

    {loading && <p className="text-center text-white">Loading...</p>}
    {error && <p className="text-center text-red-500">Error: {error}</p>}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.isArray(meals) &&
        meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white rounded shadow p-4"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="font-bold mt-2 text-lg">
              {meal.strMeal}
            </h2>

            <p className="text-gray-600">
              {meal.strTags || "No tags available"}
            </p>

            <p className="text-gray-600">
              {meal.strArea}
            </p>
          </div>
        ))}
    </div>
  </div>
</>
)
}

export default App
