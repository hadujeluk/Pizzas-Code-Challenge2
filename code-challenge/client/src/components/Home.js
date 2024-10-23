import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/restaurants");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        setError(error.message); // Set error message
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  function handleDelete(id) {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant.id !== id)
        );
      }
    });
  }

  return (
    <section className="container">
      {error && <p className="error">Error: {error}</p>} {/* Display error message */}
      {restaurants.length > 0 ? ( // Check if there are restaurants
        restaurants.map((restaurant) => (
          <div key={restaurant.id} className="card">
            <h2>
              <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
            </h2>
            <p>Address: {restaurant.address}</p>
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No restaurants available.</p> // Fallback UI if no restaurants
      )}
    </section>
  );
}

export default Home;
