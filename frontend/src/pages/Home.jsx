import React, { useState, useEffect, useCallback } from "react";
import { Flex } from "@aws-amplify/ui-react";
import KanbanBoard from "../components/organisms/KanbanBoard";
import KanbanFilters from "../components/organisms/KanbanFilters";
import NavBar from "../components/organisms/NavBar";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/functions";
import axios from "axios";
import debounce from "lodash.debounce";

const Home = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [columnsData, setColumnsData] = useState({
    todo: { name: "Nova Publicação", items: [] },
    doing: { name: "Publicação Lida", items: [] },
    review: { name: "Enviar para Advogado Responsável", items: [] },
    done: { name: "Concluído", items: [] },
  });

  const [pages, setPages] = useState({
    todo: 1,
    doing: 1,
    review: 1,
    done: 1,
  });

  useEffect(() => {
    if (!getToken()) navigate("/login");
  }, [navigate]);

  const fetchCardsByStatus = useCallback(async (status, page = 1) => {
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== '')
      );
      const params = { ...cleanFilters, status, page };
      const token = getToken();
      const API_URL = import.meta.env.VITE_API_URL;
      const LIST_CASE_PATH = import.meta.env.VITE_LIST_CASE_PATH;
      const response = await axios.get(`${API_URL}${LIST_CASE_PATH}`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.data;
    } catch (error) {
      console.error(`Erro ao buscar cards de status ${status}:`, error);
      return [];
    }
  }, [filters]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMoreCards = useCallback(debounce(async (status) => {
    const nextPage = pages[status] + 1;
    const newCards = await fetchCardsByStatus(status, nextPage);
  
    if (newCards.length > 0) {
      setColumnsData(prev => ({
        ...prev,
        [status]: {
          ...prev[status],
          items: [...prev[status].items, ...newCards],
        },
      }));
      setPages(prev => ({ ...prev, [status]: nextPage }));
    }
  }, 300), [pages]);

  const loadInitialCards = useCallback(async () => {
    const statuses = ["todo", "doing", "review", "done"];
    const initialPages = {};
    const initialData = {};

    for (let status of statuses) {
      const data = await fetchCardsByStatus(status, 1);
      initialData[status] = {
        name: columnsData[status].name,
        items: data,
      };
      initialPages[status] = 1;
    }

    setColumnsData(initialData);
    setPages(initialPages);
  }, [fetchCardsByStatus]);

  useEffect(() => {
    loadInitialCards();
  }, [filters]);

  const onSearch = (newFilters) => {
    setFilters({ ...newFilters });
  };

  return (
    <Flex minHeight="100vh" direction="column" backgroundColor='#fafaff'>
      <NavBar />
      <Flex display='flex' maxWidth={["90vw", "90vw", "1150px"]} margin="0 auto" flex="1" direction="column" padding="0 1rem" gap="1rem">
        <KanbanFilters onSearch={onSearch} />
        <Flex backgroundColor="#fff" flex="1" direction="column">
          <KanbanBoard columns={columnsData} setColumns={setColumnsData} loadMoreCards={loadMoreCards} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
