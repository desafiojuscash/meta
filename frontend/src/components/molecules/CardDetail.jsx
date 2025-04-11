import { Flex, Text } from "@aws-amplify/ui-react";
import DetailField from "../atoms/DetailField";
import { mask } from "../../utils/masks";
import DetailListField from "../atoms/DetailListField";

const CardDetail = ({ item }) => {
  return (
    <Flex
      marginTop="1rem"
      width="100%"
      display="flex"
      direction="column"
      gap="1rem"
    >
      <Text margin="0px" fontSize="16px" color="#0e2f5e">
        Publicação - {item.caseNumber === null ? "Não Informado" : item.caseNumber}
      </Text>
      <Flex display="flex" direction="column" gap="0.75rem">
        <DetailField
          text="Data de publicação no DJE"
          value={mask(item.publicationDate, "date")}
        />
        <DetailListField text="Autor (es)" values={ !(item.authors === null) ? item.authors.split(",") : ['Não Informado']} />
        <DetailListField
          text="Réu"
          values={["Instituto Nacional do Seguro Social - INSS"]}
        />
        <DetailListField
          text="Advogado(s)"
          values={item.Lawyers.map((l) => `${l.name} (OAB ${l.document})`)}
        />
        <DetailField
          text="Valor principal bruto/líquido"
          value={
            !(item.principalGrossNet === null)
              ? mask(item.principalGrossNet, "currency")
              : "Não informado"
          }
        />
        <DetailField
          text="Valor dos juros moratórios"
          value={
            !(item.lateInterest === null)
              ? mask(item.lateInterest, "currency")
              : "Não informado"
          }
        />
        <DetailField
          text="Valor dos honorários advocaticios"
          value={
            !(item.legalFees === null)
              ? mask(item.legalFees, "currency")
              : "Não informado"
          }
        />
        <DetailField
          text="Conteúdo completo da publicação"
          value={item.content}
        />
      </Flex>
    </Flex>
  );
};

export default CardDetail;
