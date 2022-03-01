import { Box, HStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function LightBox({ documents }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <div>
        <HStack spacing={4} flexWrap="wrap" align={"flex-start"}>
      {documents.map((el: any,i:number) => (
        <Box
          key={el}
          position="relative"
          width={"fit-content"}
          overflow="hidden"
          onClick={() => {
              setIsOpen(true)
              setPhotoIndex(i)
            }}
          _hover={{
            cursor: "pointer",
            _after: {
              content: "''",
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0px",
              left: "0px",
              background: "black",
              opacity: 0.5,
            //   zIndex: 2,
            },
          }}
          rounded="lg"
        >
          <Image
            src={process.env.REACT_APP_STORAGE_URL + el}
            width="300px"
            rounded="lg"
            boxShadow={"2xl"}
          />
        </Box>
      ))}

        </HStack>
      {isOpen && (
        <Lightbox
          mainSrc={process.env.REACT_APP_STORAGE_URL + documents[photoIndex]}
          nextSrc={
            process.env.REACT_APP_STORAGE_URL +
            documents[(photoIndex + 1) % documents.length]
          }
          prevSrc={
            documents[(photoIndex + documents.length - 1) % documents.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + documents.length - 1) % documents.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % documents.length)
          }
        />
      )}
    </div>
  );
}
