import Form from "./components/Form";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="form-header">
        <h1>Book Session</h1>
        <p>Fill in the form below to book a virtual session with your doctor</p>
      </div>
      <Form />
    </div>
  );
}
