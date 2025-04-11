import { Flex, Text } from "@aws-amplify/ui-react";

const DetailListField = ({ text, values }) => {
  return (
    <Flex width="100%" display="flex" direction="column">
      <Text margin="0px" fontSize="14px" color="#9a9ea7" fontWeight="600">
        {text}
      </Text>
      <ul style={{margin: "0px"}}>
        {values.map((value, index) => (
          <li key={index}>
            <Text margin="0px" fontSize="12px" color="#9a9ea7">
              {value}
            </Text>
          </li>
        ))}
      </ul>
    </Flex>
  );
};

export default DetailListField;
