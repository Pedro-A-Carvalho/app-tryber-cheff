import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { email, password } = loginData;

  const passwordLength = loginData.password.length > 6;

  const navigate = useNavigate();

  const handleChange = (
    { target }: React.ChangeEvent<
    HTMLInputElement>,
  ) => {
    const { name, value } = target;
    setLoginData({ ...loginData, [name]: value });
  };

  function emailValidation(emailData: string) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(emailData);
  }

  const storage = {
    email: loginData.email,
  };
  return (

    <form
      onSubmit={ (event) => {
        event.preventDefault();
        navigate('/meals');
        localStorage.setItem('user', JSON.stringify(storage));
      } }
    >

      <label htmlFor="email">
        <input
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        <input
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChange }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !((passwordLength && emailValidation(loginData.email))) }
      >
        Enter
      </button>

    </form>
  );
}

export default Login;
