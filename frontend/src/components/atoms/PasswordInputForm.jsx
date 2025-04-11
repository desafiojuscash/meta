import { Flex, Label, Input, View } from "@aws-amplify/ui-react";
import { useState } from "react";

const PasswordInputForm = ({
  placeholder,
  text,
  errorMessage,
  inError,
  value,
  setValue,
  onBlur,
  isRequired = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Flex
      display="flex"
      direction="column"
      alignItems="flex-start"
      width="100%"
    >
      <Label
        fontSize="16px"
        fontWeight="600"
        color="#213e6a"
        marginBottom="5px"
      >
        {text}
        {isRequired && (
          <Label color="#fc5656" fontSize="16px" fontWeight="700">
            *
          </Label>
        )}
      </Label>
      <View width="100%" position="relative">
        <Input
          type={isVisible ? "text" : "password"}
          height="36px"
          width="100%"
          borderRadius="0.3rem"
          border={inError ? "1px #fc5656 solid" : "1px #9a9ea7 solid"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {isVisible ? (
          <img
            src="/visivel.png"
            alt="eye"
            onClick={toggleVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              width: "24px",
              height: "24px",
            }}
          />
        ) : (
          <img
            src="/nao-visivel.png"
            alt="eye-off"
            onClick={toggleVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              width: "24px",
              height: "24px",
            }}
          />
        )}
      </View>
      {inError && Array.isArray(errorMessage) && (
        <Flex display='flex' direction="column" gap="0.5rem" marginTop="4px" alignItems='flex-start'>
          {errorMessage.map((msg, idx) => (
            <Label key={idx} fontSize="12px" color="#fc5656" fontWeight="600">
              - {msg}
            </Label>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default PasswordInputForm;
