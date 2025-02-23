import React from "react";
import { login } from "../utils/network-data";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoginInput from "../components/LoginInput";
import LocaleContext from "../contexts/LocaleContext";

const Login = ({ loginSuccess }) => {
  const { locale } = React.useContext(LocaleContext);


  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    } else {
      alert(locale === "id" ? "Login gagal. Periksa email dan password Anda." : "Login failed. Please check your email and password.");
    }
  }

  return (
    <section className="login-section">
      <h2 className="login-title">
        {locale === "id" 
          ? "Monggo, login untuk menggunakan aplikasi." 
          : "Please, login to use the app."}
      </h2>

    
      <LoginInput login={onLogin} />


      <p className="login-register-text">
        {locale === "id" ? "Belum punya akun? " : "Don't have an account? "}
        <Link to="/register" className="login-register-link">
          {locale === "id" ? "Daftar di sini." : "Register here"}
        </Link>
      </p>
    </section>
  );
};

// Prop type validation
Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default Login;