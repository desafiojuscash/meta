import React, { useCallback, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Flex, View, Text, Grid } from "@aws-amplify/ui-react";
import KanbanCard from "../molecules/KanbanCard";
import Modal from "../atoms/Modal";
import CardDetail from "../molecules/CardDetail";
import axios from "axios";
import { getToken } from "../../utils/functions";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

export default function KanbanBoard({ columns, setColumns, loadMoreCards }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const validTransitions = {
    todo: ["doing"],
    doing: ["review"],
    review: ["done", "doing"],
    done: [],
  };

  const [loadingStates, setLoadingStates] = useState({
    todo: false,
    doing: false,
    review: false,
    done: false,
  });

  const debouncedHandleScroll = useCallback(
    (status) => {
      return debounce(async (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;

        if (isNearBottom && !loadingStates[status]) {
          setLoadingStates((prev) => ({ ...prev, [status]: true }));
          await loadMoreCards(status);
          setLoadingStates((prev) => ({ ...prev, [status]: false }));
        }
      }, 200);
    },
    [loadMoreCards, loadingStates]
  );

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const from = source.droppableId;
    const to = destination.droppableId;
    const allowedTransitions = validTransitions[from];
    const isSameColumn = from === to;

    if (!isSameColumn && !allowedTransitions.includes(to)) {
      toast.error("Movimentação não permitida.", {
        position: "top-right",
      });
      return;
    }

    const sourceCol = columns[from];
    const destCol = columns[to];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    movedItem.status = to;

    if (isSameColumn) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [from]: {
          ...sourceCol,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [from]: {
          ...sourceCol,
          items: sourceItems,
        },
        [to]: {
          ...destCol,
          items: destItems,
        },
      });
    }

    try {
      const token = getToken();
      const API_URL = import.meta.env.VITE_API_URL;
      const UPDATE_STATUS_PATH = import.meta.env.VITE_UPDATE_STATUS_PATH;
      await axios.patch(
        `${API_URL}${UPDATE_STATUS_PATH}/${movedItem.id}`,
        { status: to },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Erro ao atualizar status no backend", {
        position: "top-right",
      });
      console.error(error);
    }
  };

  return (
    <Flex overflow="auto" direction="column" display="flex" flex="1">
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          columnGap="1rem"
          templateColumns="1fr 1fr 1fr 1fr"
          display="grid"
          flex="1"
        >
          {Object.entries(columns).map(([colId, col]) => (
            <Droppable droppableId={colId.toString()} key={colId}>
              {(provided, snapshot) => (
                <View
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  backgroundColor={
                    snapshot.isDraggingOver ? "#f0f8ff" : "#f0f0f0"
                  }
                  border="1px solid #e0e0e0"
                  padding="0.5rem"
                  minHeight="300px"
                  minWidth={["200px", "200px", "250px"]}
                  style={{ 
                    height: '80vh',
                    overflowY: 'auto', 
                  }}
                  width="1fr"
                  onScroll={(e) => debouncedHandleScroll(colId)(e)}
                >
                  <div>
                    <Flex direction="row" display="flex" alignItems="center">
                      {col.name == "Concluído" && <img src="/gaveta.png" />}
                      <Text
                        margin="0.75rem 1rem 0.75rem 0.75rem"
                        textAlign="left"
                        color={col.name == "Concluído" ? "#41a44a" : "#1f3d6a"}
                        level={5}
                      >
                        {col.name}
                      </Text>
                      <Text
                        margin="0rem"
                        textAlign="left"
                        color="#9a9ea7"
                        level={5}
                      >
                        {col.items.length}
                      </Text>
                    </Flex>
                  </div>
                  {col.items.length > 0 &&
                    col.items.map((item, index) => (
                      <Draggable
                        draggableId={item.id.toString()}
                        index={index}
                        key={item.id}
                      >
                        {(provided, snapshot) => (
                          <KanbanCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            backgroundColor={
                              snapshot.isDragging ? "#e0f2fe" : "#ffffff"
                            }
                            borderRadius="0.5rem"
                            padding="0.75rem"
                            marginBottom="0.75rem"
                            boxShadow="0px 2px 6px rgba(0,0,0,0.1)"
                            {...provided.draggableProps.style}
                            title={item.caseNumber}
                            publicationDate={item.publicationDate}
                            updatedAt={item.updatedAt}
                            onClick={() => openModal(item)}
                          />
                        )}
                      </Draggable>
                    ))}
                  {col.items.length === 0 && (
                    <Text color="#7c838e">Nenhum card encontrado</Text>
                  )}
                  {provided.placeholder}
                  {loadingStates[colId] && (
                    <Text textAlign="center" padding="1rem">
                      Carregando...
                    </Text>
                  )}
                </View>
              )}
            </Droppable>
          ))}
        </Grid>
      </DragDropContext>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedItem && <CardDetail item={selectedItem} />}
      </Modal>
    </Flex>
  );
}
