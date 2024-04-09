import React, { useEffect, useState } from 'react';

function DisplayPicture({ mealType }) {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        const imgUrl = meal.strMealThumb;
        setImgUrl(imgUrl);
      })
      .catch(error => {
        console.error('Error fetching meal data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <div>
      {imgUrl && (
        <img
          src={imgUrl}
          alt="Meal"
          style={{ maxWidth: '300px', maxHeight: '200px' }}
        />
      )}
    </div>
  );
}

export default DisplayPicture;
