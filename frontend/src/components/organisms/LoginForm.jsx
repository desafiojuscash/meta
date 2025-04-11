import { Button, Flex } from "@aws-amplify/ui-react";
import InputForm from "../atoms/InputForm";
import PasswordInputForm from "../atoms/PasswordInputForm";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validators";
import axios from "axios";
import Loader from "../atoms/Loader";
import { setToken } from "../../utils/functions";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordInError, setPasswordInError] = useState(false);
  const [emailInError, setEmailInError] = useState(false);

  const handleEmailBlur = () => {
    const { valid, error } = validateEmail(email);
    setEmailInError(!valid);
    setEmailError(error);
  };

  const handlePasswordBlur = () => {
    const { valid, errors } = validatePassword(password);
    setPasswordInError(!valid);
    setPasswordErrors(errors);
  };
  
  const handleLogin = async () => {
    setIsLoading(true);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
  
    setEmailInError(!emailValidation.valid);
    setEmailError(emailValidation.error);
  
    setPasswordInError(!passwordValidation.valid);
    setPasswordErrors(passwordValidation.errors);
  
    if (emailValidation.valid && passwordValidation.valid) {
      const basicAuth = btoa(`${email}:${password}`);
      const API_URL = import.meta.env.VITE_API_URL;
      const AUTH_PATH = import.meta.env.VITE_AUTH_PATH;
      await axios.post(`${API_URL}${AUTH_PATH}`, {}, {
        headers: {
          Authorization: `Basic ${basicAuth}`
        }
      }).then((response) => {
        setToken(response.data.access_token);
        navigate("/");
      })
      .catch((error) => {
        const { response } = error;
        if (response.status === 401) {
          toast.error('Erro ao fazer login. Verifique suas credenciais.', {
            position: "top-right",
          });
          setEmailInError(true);
          setEmailError("E-mail ou senha inválidos");
        } else {
          setEmailInError(true);
          setEmailError("Erro ao fazer login, tente novamente mais tarde.");
        }
      }
      );
      setIsLoading(false);
    }
  };
  

  return (
    <Flex
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding={["1rem", "1rem", "5rem"]}
      gap="2rem"
      width={["90%", "90%", "100%"]}
      maxWidth="400px"
      backgroundColor="#fff"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      flex={1}
    >
      <img src="/juscash.png" width="200rem" />
      <InputForm
        text="E-mail:"
        inError={emailInError}
        errorMessage={emailError}
        value={email}
        setValue={setEmail}
        onBlur={handleEmailBlur}
      />
      <PasswordInputForm
        text="Senha:"
        inError={passwordInError}
        errorMessage={passwordErrors}
        value={password}
        setValue={setPassword}
        onBlur={handlePasswordBlur}
      />
      <Button backgroundColor="#51c77e" color="#fff" onClick={handleLogin}>
        { isLoading ? <Loader /> : "Login" }
      </Button>
      <Link to="/signup" style={{ color: "#213e6a", textDecoration: "underline" }}>
        Não possui uma conta? Cadastre-se
      </Link>
    </Flex>
  );
};

export default LoginForm;