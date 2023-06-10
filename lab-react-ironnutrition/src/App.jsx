import './App.css';
import FoodCard from './components/FoodCard';
import foodsData from './foods.json';
import { useState } from 'react';
import { Row, Divider, Button } from 'antd';
import AddFoodForm from './components/AddFoodForm';
import Search from './components/Search';

function App() {
  const [foods, setFoods] = useState(foodsData);

  const addFoodHandler = (newFood) => {
    setFoods((previousFoodList) => [...previousFoodList, newFood]);
  };

  const searchHandler = (searchedValue) => {
    const foodsCopy = [...foodsData];
    const filteredFoods = foodsCopy.filter((food) => {
      if (food.name.toLowerCase().includes(searchedValue.toLowerCase())) {
        return food;
      }
    });

    setFoods(filteredFoods);
  };

  return (
    <div className="App">
      <AddFoodForm addNewFood={addFoodHandler} />

      <Search filterFoods={searchHandler} />

      <Divider>Food List</Divider>

      <Row style={{ width: '100%', justifyContent: 'center' }}>
        {/* Render the list of Food Box components here */}
        {foods.map((food) => {
          return <FoodCard key={food.name + food.image} food={food} />;
        })}
      </Row>
    </div>
  );
}

export default App;
