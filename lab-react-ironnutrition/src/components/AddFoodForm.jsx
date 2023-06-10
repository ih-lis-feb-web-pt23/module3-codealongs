import { Divider, Input } from 'antd';
import { useState } from 'react';

function AddFoodForm(props) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [calories, setCalories] = useState(0);
  const [servings, setServings] = useState(0);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleCalories = (event) => {
    setCalories(event.target.value);
  };

  const handleServings = (event) => {
    setServings(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFood = { name, image, calories, servings };

    props.addNewFood(newFood);

    setName('');
    setImage('');
    setCalories(0);
    setServings(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Divider>Add Food Entry</Divider>

      <label>Name</label>
      <Input value={name} type="text" onChange={handleName} />

      <label>Image</label>
      <Input type="text" value={image} onChange={handleImage} />

      <label>Calories</label>
      <Input type="number" value={calories} onChange={handleCalories} />

      <label>Servings</label>
      <Input type="number" value={servings} onChange={handleServings} />

      <button type="submit">Create</button>
    </form>
  );
}

export default AddFoodForm;
