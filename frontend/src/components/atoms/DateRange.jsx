import { View, Flex, Label, Input, Button } from "@aws-amplify/ui-react";

const DateRange = ({ onStartDateChange, onEndDateChange, startDate, endDate, onSearch }) => {
  return (
    <View>
      <Flex display="flex" direction="column" alignItems="flex-start">
        <Label fontSize="16px" color="#0e2f5e" marginBottom="5px">
          Data do diário
        </Label>
        <Flex display='flex' direction='row' gap="0.5rem">
          <Flex display='flex' direction='row' alignItems='center' gap='5px'>
            <Label fontSize='12px'>De:</Label>
            <Input onChange={onStartDateChange} value={startDate} height='14px' type="date" borderRadius='0.3rem' padding='0.3rem' border='1px #9a9ea7 solid' />
          </Flex>
          <Flex display='flex' direction='row' alignItems='center' gap='5px'>
            <Label fontSize='12px'>Até:</Label>
            <Input onChange={onEndDateChange} value={endDate} height='14px' type="date" borderRadius='0.3rem' padding='0.3rem' border='1px #9a9ea7 solid' />
          </Flex>
          <Button onClick={onSearch} backgroundColor='#41A44A' padding='0' margin='0' height='25px' width='30px'><img src="/lupa.png" width='16px' height='16px'/></Button>
        </Flex>
      </Flex>
    </View>
  );
};

export default DateRange;
