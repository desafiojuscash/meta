import { Flex, Label, Input } from "@aws-amplify/ui-react";

const InputForm = ({
  placeholder,
  text,
  errorMessage,
  inError,
  value,
  setValue,
  onBlur,
  isRequired = false,
}) => {
  return (
    <Flex display="flex" direction="column" alignItems="flex-start" width="100%">
      <Label fontSize="16px" fontWeight="600" color="#213e6a" marginBottom="5px">
        {text}
        {isRequired && (
          <Label color="#fc5656" fontSize="16px" fontWeight="700">
            *
          </Label>
        )}
      </Label>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type="email"
        height="36px"
        width="100%"
        borderRadius="0.3rem"
        border={inError ? "1px #fc5656 solid" : "1px #9a9ea7 solid"}
        placeholder={placeholder}
      />
      {inError && (
        <Label fontSize="12px" color="#fc5656" fontWeight="600">
          {errorMessage}
        </Label>
      )}
    </Flex>
  );
};

export default InputForm;
