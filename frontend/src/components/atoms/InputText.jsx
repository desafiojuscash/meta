import { View, Flex, Label, Input } from "@aws-amplify/ui-react";

const InputText = ({ placeholder, text, onChange, value }) => {
  return (
    <View width='100%'>
      <Flex display="flex" direction="column" alignItems="flex-start" width='100%'>
        <Label fontSize='16px' color='#0e2f5e' marginBottom='5px'>{text}</Label>
        <Input value={value} onChange={onChange} height='14px' width={['100%', '100%', '370px']} maxWidth='370px' borderRadius='0.3rem' padding='0.3rem' border='1px #9a9ea7 solid' placeholder={placeholder} />
      </Flex>
    </View>
  );
};

export default InputText;
