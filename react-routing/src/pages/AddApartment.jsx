import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddApartment = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleImage = event => {
    setImage(event.target.value);
  };

  const handlePrice = event => {
    setPrice(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    let newApartment = {
      title,
      pricePerDay: price
    };

    if (image !== '') {
      newApartment.img = image;
    }

    try {
      await axios.post(
        'https://ironbnb-m3.herokuapp.com/apartments',
        newApartment
      );
      navigate('/apartments');
    } catch (error) {
      console.log(error);
    }

    setTitle('');
    setImage('');
    setPrice(0);
  };

  return (
    <div>
      <h1>Add a new apartment</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Title</label>
        <input type='text' name='title' value={title} onChange={handleTitle} />

        <label htmlFor=''>Image</label>
        <input type='text' name='image' value={image} onChange={handleImage} />

        <label htmlFor=''>Price per Day</label>
        <input
          type='number'
          name='price'
          value={price}
          onChange={handlePrice}
        />

        <button type='submit'>Create Apartment</button>
      </form>
    </div>
  );
};

export default AddApartment;
