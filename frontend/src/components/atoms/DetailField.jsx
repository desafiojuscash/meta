import { Flex, Text } from "@aws-amplify/ui-react";

const DetailField = ({ text, value }) => {
  return (
    <Flex width="100%" display="flex" direction="column">
      <Text margin='0px' fontSize="14px" color="#9a9ea7" fontWeight='600'>
        {text}
      </Text>
      <Text margin='0px' fontSize="12px" color="#9a9ea7">{value}</Text>
    </Flex>
  );
};

export default DetailField;
