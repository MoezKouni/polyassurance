import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import Forbidden from "../Banner/Forbidden/Forbidden";

export default function CardDetails({
  title,
  data,
  baseLink,
  isLoading,
  notAuthorized,
}: {
  title: string;
  data: any;
  baseLink: string;
  isLoading: boolean;
  notAuthorized: any;
}) {
  return (
    <Box>
      <Heading mb="6" textAlign={"center"} fontSize="2xl">
        {title}
      </Heading>
      <List spacing={3}>
        {isLoading ? (
          <p>Loading...</p>
        ) : notAuthorized ? (
          <Forbidden msg={notAuthorized} />
        ) : (
          data.map((el: any, i: number) => (
            <>
              <ListItem
                key={i}
                display="flex"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Box display="flex" alignItems={"center"}>
                  <Image
                    src={el.avatar || avatarPlaceholder}
                    rounded="full"
                    fit={"cover"}
                    w="30"
                    h="30"
                  />
                  <Stack spacing={0} ml="2">
                    <Text fontSize={"md"}>
                      {el.firstname + " " + el.lastname}
                    </Text>
                    <Text fontSize={"sm"} color="gray.500">
                      {moment(el.createdAt).format("DD/MM/YYYY - H:mm")}
                    </Text>
                  </Stack>
                </Box>
                <Link to={`${baseLink}/details/${el._id}`}>
                  <IconButton
                    aria-label="voir détails"
                    icon={<ChevronRightIcon />}
                    variant="ghost"
                  />
                </Link>
              </ListItem>
              {i < data.length - 1 && <Divider />}
            </>
          ))
        )}
        {!notAuthorized && <ListItem justifyContent={"center"} display="flex">
          <Link to={baseLink}>
            <Button mt="4" variant={"ghost"}>
              Voir Plus
            </Button>
          </Link>
        </ListItem>}
      </List>
    </Box>
  );
}
