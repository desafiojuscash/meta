import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Flex, Text } from "@aws-amplify/ui-react";
import InputText from "../atoms/InputText";
import DateRange from "../atoms/DateRange";
import debounce from "lodash.debounce";

const KanbanFilters = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtersRef = useRef({ searchTerm, startDate, endDate });

  useEffect(() => {
    filtersRef.current = { searchTerm, startDate, endDate };
  }, [searchTerm, startDate, endDate]);

  const debouncedSearch = useMemo(() => {
    return debounce(() => {
      const { searchTerm, startDate, endDate } = filtersRef.current;
      onSearch({
        term: searchTerm,
        startDate,
        endDate,
      });
    }, 1000);
  }, []);

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchTerm, startDate, endDate, debouncedSearch]);

  return (
    <View width="100%">
      <Flex
        display="flex"
        direction={["column", "column", "column", "row"]}
        justifyContent="space-between"
        alignItems={["stretch", "stretch", "stretch", "flex-end"]}
      >
        <div>
          <Flex display="flex" direction="row" alignItems="center" gap="1rem">
            <img width="32px" src="/balanca.png" alt="Logo" />
            <Text
              margin="1rem 0rem 1rem 0rem"
              color="#0e2f5e"
              fontSize="32px"
              fontWeight="700"
            >
              Publicações
            </Text>
          </Flex>
        </div>
        <div>
          <Flex
            display="flex"
            direction={["column", "column", "column", "row"]}
            justifyContent="space-between"
            alignItems={["stretch", "stretch", "stretch", "center"]}
            gap="1rem"
          >
            <View>
              <InputText
                text="Pesquisa"
                placeholder="Digite o número do processo ou nome das partes envolvidas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </View>
            <div>
              <DateRange
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={(e) => setStartDate(e.target.value)}
                onEndDateChange={(e) => setEndDate(e.target.value)}
                onSearch={() => {
                  onSearch({
                    term: searchTerm,
                    startDate,
                    endDate,
                  });
                }}
              />
            </div>
          </Flex>
        </div>
      </Flex>
    </View>
  );
};

export default KanbanFilters;
