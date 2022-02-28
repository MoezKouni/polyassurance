import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuthProvider } from "../../providers/AuthProvider";
import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import { logout } from "../../services/auth/services";
import { useHistory, useLocation } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";

const Links = [
  {
    label: "Nos produits",
    link: "/nos-produits",
  },
  { label: "Nous contacter", link: "/contact" },
];

const NavLink = ({ children, link }: { children: ReactNode; link: string }) => (
  <ReactLink to={link}>
    <Link
      px={2}
      as="span"
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      zIndex="2"
    >
      {children}
    </Link>
  </ReactLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useAuthProvider();
  const history = useHistory();
  const { pathname } = useLocation();

  if (pathname.includes("/connexion") || pathname.includes("/inscription"))
    return null;
  return (
    <Container maxW="7xl">
      <Box bg={"white"} py="4" zIndex="2">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <ReactLink to="/">
                <Logo />
              </ReactLink>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.label} link={link.link}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {data ? (
              <HStack>
                <Text mr="2" fontWeight={"bold"}>
                  {data?.firstname + " " + data?.lastname}
                </Text>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={avatarPlaceholder} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        logout(history.push);
                        history.go(0);
                      }}
                    >
                      Se déconnecter
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            ) : (
              <Stack direction={"row"} spacing={4} align="center">
                <ReactLink to="/connexion">
                  <Button colorScheme="twitter" variant="ghost">
                    Se connecter
                  </Button>
                </ReactLink>
                <ReactLink to="/inscription">
                  <Button colorScheme="twitter" variant="solid">
                    S'inscrire
                  </Button>
                </ReactLink>
              </Stack>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.label} link={link.link}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}
