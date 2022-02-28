import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React from "react";

export default function DialogAlert({ btnText, onClick, title, content, confirmBtnText, isLoading, colorSchema }: any) {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = async () => {
    await onClick();
    setIsOpen(false);
  };

  const cancelRef = React.useRef<any>();
  return (
    <>
      <Button size={"sm"} colorScheme={colorSchema} variant="ghost" onClick={() => setIsOpen(true)}>
        {btnText}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {content}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)} disabled={isLoading}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3} isLoading={isLoading}>
                {confirmBtnText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
