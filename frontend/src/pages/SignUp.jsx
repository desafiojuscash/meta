import { Flex } from "@aws-amplify/ui-react";
import SignUpForm from "../components/organisms/SignUpForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../utils/functions";

const SignUp = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(getToken()) navigate("/");
  });
  return (
    <Flex minHeight="100vh" display="flex" direction="column" alignItems='center'>
      <SignUpForm />
    </Flex>
  );
};

export default SignUp;
