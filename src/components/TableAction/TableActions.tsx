import { HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DialogAlert from "../DialogAlert/DialogAlert";

export default function TableActions({
  user,
  type,
  onArchive,
  isLoading,
}: any) {
  return (
    <HStack>
      <Link to={`/${type}/modifier?q=${user._id}`}>
        <Button size={"sm"}>Modifier</Button>
      </Link>
      <DialogAlert
        btnText={user.archived ? "Restaurer" : "Archiver"}
        onClick={() => onArchive()}
        isLoading={isLoading}
        content={
          user.archived
            ? "Êtes-vous sûr de vouloire restaurer cet utilisateur ? cet utilisateur pourra accéder a son compte."
            : "Êtes-vous sûr de vouloire archiver cet utilisateur? cet utilisateur ne pourra plus accéder a son compte."
        }
        title={
          user.archived
            ? "Restaurer cet utilisateur"
            : "Archiver cet utilisateur"
        }
        confirmBtnText={user.archived ? "Restaurer" : "Archiver"}
        colorSchema={user.archived ? "whatsapp" : "red"}
      />
    </HStack>
  );
}
