export default function DropDown(props) {
  return (
    <>
      <label className="dropdown-label" htmlFor={props.label}>
        {props.label}:
      </label>
      <select onChange={props.onChange} name={props.label} id={props.label}>
        {props.listOfItems.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
