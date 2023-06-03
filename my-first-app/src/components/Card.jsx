// const person = {
//   firstName: 'Lucia',
//   lastName: 'Duarte'
// };

const nameLength = personObject => {
  return personObject.firstName.length + personObject.lastName.length;
};

// props is an object with the properties that
// are sent into the component
const Card = props => {
  // console.log(props);
  return (
    <div>
      <h2>
        Welcome {props.firstName} {props.lastName.toUpperCase()}
      </h2>
      <p>Your name has {nameLength(props)} characters!</p>
      <p>
        You're in week {props.week} of the {props.course.name} course in{' '}
        {props.course.city}!
      </p>
    </div>
  );
};

export default Card;
