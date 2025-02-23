import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

const RegisterInput = ({ register }) => {
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirm, setConfirm] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() !== confirm.trim()) {
      return alert("Password and confirmation must match.");
    }
    register({ name, email, password });
  };

  return (
    <form className="input-register" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" required onChange={setName} />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" required onChange={setEmail} />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" required autoComplete="new-password" onChange={setPassword} />

      <label htmlFor="confirm">Confirm Password</label>
      <input id="confirm" type="password" required autoComplete="new-password" onChange={setConfirm} />

      <button type="submit">Register</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
