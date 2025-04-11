import { Button, Flex, View } from "@aws-amplify/ui-react";
import InputForm from "../atoms/InputForm";
import PasswordInputForm from "../atoms/PasswordInputForm";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validatePassword, validateFullName } from "../../utils/validators";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");

  const [nameInError, setNameInError] = useState(false);
  const [nameError, setNameError] = useState("");

  const [emailInError, setEmailInError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [passwordInError, setPasswordInError] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const [passwordRepeatInError, setPasswordRepeatInError] = useState(false);
  const [passwordRepeatErrors, setPasswordRepeatErrors] = useState([]);

  const handleNameBlur = () => {
    const { valid, error } = validateFullName(name);
    setNameInError(!valid);
    setNameError(error);
  };

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

  const handlePasswordRepeatBlur = () => {
    const errors = [];
    if (passwordRepeated !== password) {
      errors.push("A senha de confirmação não corresponde à senha.");
    }
    setPasswordRepeatInError(errors.length > 0);
    setPasswordRepeatErrors(errors);
  };

  const handleSubmit = async () => {
    let hasError = false;
    setIsLoading(true);
    const nameValidation = validateFullName(name);
    setNameInError(!nameValidation.valid);
    setNameError(nameValidation.error);
    if (!nameValidation.valid) hasError = true;

    const emailValidation = validateEmail(email);
    setEmailInError(!emailValidation.valid);
    setEmailError(emailValidation.error);
    if (!emailValidation.valid) hasError = true;

    const passwordValidation = validatePassword(password);
    setPasswordInError(!passwordValidation.valid);
    setPasswordErrors(passwordValidation.errors);
    if (!passwordValidation.valid) hasError = true;

    const passwordConfirmErrors = [];
    if (password !== passwordRepeated) {
      passwordConfirmErrors.push("A senha de confirmação não corresponde à senha.");
    }
    setPasswordRepeatInError(passwordConfirmErrors.length > 0);
    setPasswordRepeatErrors(passwordConfirmErrors);
    if (passwordConfirmErrors.length > 0) hasError = true;

    if (!hasError) {
      const API_URL = import.meta.env.VITE_API_URL;
      const CREATE_USER_PATH = import.meta.env.VITE_CREATE_USER_PATH;
      await axios.post(`${API_URL}${CREATE_USER_PATH}`, {
        name,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        navigate("/login");
      })
      .catch((err) => {
        const { response } = err;
        if (response.status === 409) {
          setEmailInError(true);
          setEmailError("E-mail já cadastrado");
          toast.error('E-mail já cadastrado', {
            position: "top-right",
          });
        } else {
          toast.error('Falha ao tentar cadastrar o usuário. Tente mais tarde', {
            position: "top-right",
          });
        }
      });
    }
    setIsLoading(false);
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
      backgroundColor={"#fff"}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      flex={1}
    >
      <img src="/juscash.png" width="200rem" />
      <InputForm
        text="Seu nome completo:"
        inError={nameInError}
        errorMessage={nameError}
        value={name}
        setValue={setName}
        isRequired={true}
        onBlur={handleNameBlur}
      />
      <InputForm
        text="E-mail:"
        inError={emailInError}
        errorMessage={emailError}
        value={email}
        setValue={setEmail}
        isRequired={true}
        onBlur={handleEmailBlur}
      />
      <PasswordInputForm
        text="Senha:"
        inError={passwordInError}
        errorMessage={passwordErrors}
        value={password}
        setValue={setPassword}
        isRequired={true}
        onBlur={handlePasswordBlur}
      />
      <PasswordInputForm
        text="Confirme sua senha:"
        inError={passwordRepeatInError}
        errorMessage={passwordRepeatErrors}
        value={passwordRepeated}
        setValue={setPasswordRepeated}
        isRequired={true}
        onBlur={handlePasswordRepeatBlur}
      />
      <Button backgroundColor="#51c77e" color="#fff" onClick={handleSubmit}>
      { isLoading ? <Loader /> : "Criar conta" }
      </Button>
      <Link
        to="/login"
        style={{ color: "#213e6a", textDecoration: "underline" }}
      >
        Já possui uma conta? Fazer login
      </Link>
    </Flex>
  );
};

export default SignUpForm;
