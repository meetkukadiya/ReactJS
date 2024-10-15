var React,
  useState = require("react");

const UseState = () => {
  const [inputValue, newChangeValue] = useState("Meet");

  const onChange = (event) => {
    const newval = event.target.value;
    newChangeValue(newval);
  };

  return (
    <div>
      <h1>{inputValue}</h1>
      <input
        type="text"
        onChange={onChange}
        value={inputValue}
        placeholder="Please Enter the Value"
      ></input>
    </div>
  );
};

export default UseState;



