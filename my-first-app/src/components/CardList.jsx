const CardList = props => {
  return (
    <div>
      <h2>This is my amazing list!</h2>
      {props.children}
    </div>
  );
};

export default CardList;
