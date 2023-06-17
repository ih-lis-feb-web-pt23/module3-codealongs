import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(
          'https://ironbnb-m3.herokuapp.com/apartments'
        );

        // with axios, the info we are looking for is always inside data
        console.log('axios response:', response.data);

        setApartments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApartments();
  }, []); // empty array: runs only once!

  return (
    <div>
      <h1>Apartments</h1>

      {isLoading && <Spinner />}
      {apartments &&
        apartments.map(apartment => {
          return (
            <div key={apartment._id} className='card'>
              <img src={apartment.img} alt='' width={500} />
              <h3>{apartment.title}</h3>
              <p>Price: {apartment.pricePerDay}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Apartments;
