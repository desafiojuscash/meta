import { Flex } from "@aws-amplify/ui-react";
import LoginForm from "../components/organisms/LoginForm";
import { useEffect } from "react";
import { getToken } from "../utils/functions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(getToken()) navigate("/");
  });

  return (
    <Flex minHeight="100vh" display="flex" direction="column" alignItems='center'>
      <LoginForm />
    </Flex>
  );
};

export default Login;
