import { Button, Flex, Text } from "@aws-amplify/ui-react";
import { clearToken } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navegate = useNavigate();
  
  const handleLogout = () => {
    clearToken();
    navegate("/login");
  }
  
  return (
    <nav>
      <Flex display='flex' direction='row' justifyContent='space-between' alignItems='center' padding='1rem'>
        <img width='150rem' src='/juscash.png'/>
        <Button onClick={handleLogout}>
          <Flex display='flex' direction='row' alignItems='center' gap='0.25rem'>
            <img src="/sair.png" width='20rem' />
            <Text display={['none', 'none', 'inherit']} color='#5d6670' fontSize='1rem' margin='0'>Sair</Text>
          </Flex>
        </Button>
      </Flex>
    </nav>
  )
}

export default NavBar;