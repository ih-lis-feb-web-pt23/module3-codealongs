import { Component } from 'react';

class ClassComponent extends Component {
  render() {
    // let headingColor;
    // if (this.props.isImportant) {
    //   headingColor = 'red';
    // } else {
    //   headingColor = 'blue';
    // }

    return (
      <div>
        {/* <h2 style={{ color: headingColor }}> */}
        {/* Ternary operator */}
        <h2 style={{ color: this.props.isImportant ? 'red' : 'blue' }}>
          This here comes from a Class Component...
        </h2>
      </div>
    );
  }
}

export default ClassComponent;
