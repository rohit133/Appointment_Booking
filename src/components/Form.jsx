import axios from "axios";
import { useState } from "react";
import DropDown from "./DropDown";
import InputFields from "./InputFields";
import RadioBtn from "./RadioBtn";

export default function Form() {
  const listOfDoc = [
    "Select your doctor",
    "Dr. Rohit Sharma",
    "Dr. Hari",
    "Dr. Shiv",
    "Dr. Sonali Gupta",
  ];

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "FirstName":
      case "LastName":
        if (!/^[A-Za-z]{2,}$/.test(value)) {
          error = "Only letters, min 2 characters.";
        }
        break;
      case "Email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format.";
        }
        break;
      case "AppointmentDate":
        if (!value) {
          error = "Please select a date.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
    validateInput(name, value);
  };

  const handleDropDownChange = (e) => {
    setInputs((values) => ({ [e.target.name]: e.target.value, ...values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    console.log("Form Data: ", inputs);

    try {
      const response = await postAppointment(inputs);
      if (response.status === 201) {
        setSuccess(true);
        setAppointmentId(response.data.id); // Store the created appointment ID
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const postAppointment = async (data) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  const handleCancel = async () => {
    if (!appointmentId) return;

    try {
      const response = await deleteAppointment(appointmentId);
      if (response.status === 200) {
        // 200 indicates successful deletion
        setInputs({});
        setErrors({});
        setSuccess(false);
        setAppointmentId(null); // Clear the stored ID
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const isFormValid = () => {
    return (
      inputs.FirstName &&
      inputs.LastName &&
      inputs.Email &&
      inputs.Doctor &&
      inputs.Doctor !== "Select your doctor" &&
      (!inputs.AppointmentDate ? false : true) &&
      Object.values(errors).every((error) => error === "")
    );
  };

  if (loading) {
    return <h3>Scheduling Appointment...</h3>;
  }
  if (success) {
    return (
      <div className="form">
        <h3>Appointment Booked Successfully!</h3>
        <button className="btn" onClick={handleCancel}>
          Cancel Booking
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <InputFields
        label="First Name"
        type="text"
        value={inputs.FirstName || ""}
        name="FirstName"
        onChange={handleInputChange}
      />
      {errors.FirstName && <p className="error">{errors.FirstName}</p>}

      <InputFields
        label="Last Name"
        type="text"
        value={inputs.LastName || ""}
        name="LastName"
        onChange={handleInputChange}
      />
      {errors.LastName && <p className="error">{errors.LastName}</p>}

      <InputFields
        label="Email"
        type="email"
        value={inputs.Email || ""}
        name="Email"
        onChange={handleInputChange}
      />
      {errors.Email && <p className="error">{errors.Email}</p>}

      <DropDown
        label="Doctor"
        listOfItems={listOfDoc}
        onChange={handleDropDownChange}
      />

      {inputs.Doctor && inputs.Doctor !== "Select your doctor" && (
        <>
          <h4 style={{ fontWeight: "normal" }}>Where:</h4>
          <RadioBtn
            id="gmeet"
            name="where"
            value="Google Meet"
            onChange={handleInputChange}
          />
          <RadioBtn
            id="phone"
            name="where"
            value="Phone"
            onChange={handleInputChange}
          />

          <InputFields
            label="When"
            type="datetime-local"
            value={inputs.AppointmentDate || ""}
            name="AppointmentDate"
            onChange={handleInputChange}
          />
          {errors.AppointmentDate && (
            <p className="error">{errors.AppointmentDate}</p>
          )}
        </>
      )}

      <button type="submit" className="btn" disabled={!isFormValid()}>
        Confirm Booking
      </button>
    </form>
  );
}
