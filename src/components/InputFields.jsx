export default function InputFields(props) {
  //   console.log(props);
  return (
    <div>
      {props.label == "When" || props.label == "Where" ? (
        <label
          className="dropdown-label"
          style={{ display: "block" }}
          htmlFor={props.name}
        >
          {" "}
          {props.label}:{" "}
        </label>
      ) : (
        <label htmlFor={props.name}> {props.label}: </label>
      )}

      <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}
