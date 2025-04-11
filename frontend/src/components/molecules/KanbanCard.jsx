import { Card, Flex, Text } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { mask } from "../../utils/masks";

const KanbanCard = ({ title, publicationDate, updatedAt, ...props }) => {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const getRelativeTime = (isoDate) => {
      const updatedDate = new Date(isoDate);
      const now = new Date();
      const diffInSeconds = Math.floor((now - updatedDate) / 1000);

      const minutes = Math.floor(diffInSeconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365);

      if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
      } else if (minutes < 60) {
        return `${minutes}m`;
      } else if (hours < 24) {
        return `${hours}h`;
      } else if (days < 365) {
        return `${days}d`;
      } else {
        return `${years}a`;
      }
    };

    if (updatedAt) {
      setLastUpdated(getRelativeTime(updatedAt));
    }
  }, [updatedAt]);
  return (
    <Card {...props} variation="elevated">
      <div>
        <Flex textAlign='left' display="flex" direction="column" alignItems="flex-start">
          <Text fontWeight="500" margin="0px 0px 5px 0px" color="#7e9098">
            {title}
          </Text>
          <div>
            <Flex display="flex" direction="row" alignItems="center">
              <div style={{margin: "0rem 3rem 0rem 0rem"}}>
                <Flex direction='row' display='flex' alignItems='center'>
                  <img src='/relogio.png' />
                  <Text margin='0px 0px 0px 5px' fontSize="0.8rem" color="#9a9ea7">
                    {lastUpdated}
                  </Text>
                </Flex>
              </div>
              <div>
                <Flex direction='row' display='flex' alignItems='center'>
                  <img src='/calendario.png' />
                  <Text margin='0px 0px 0px 5px' fontSize="0.8rem" color="#9a9ea7">
                  {mask(publicationDate, "date")}
                  </Text>
                </Flex>
              </div>
            </Flex>
          </div>
        </Flex>
      </div>
    </Card>
  );
};

export default KanbanCard;
