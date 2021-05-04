// import './Square.css';

function Square(props) {

    const handleClick = () => {
        props.onClick(props.column, props.row)
    }

  if (props.clicked) {
    return <td className="grid-square">:o</td>;
  } else {
    return <td className="grid-square" onClick={handleClick}>?</td>;
  }
}

export default Square;
