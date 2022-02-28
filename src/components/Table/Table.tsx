import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export const Th = (props: any) => {
  return (
    <Text
      as="th"
      textTransform="capitalize"
      fontSize={{ base: "0.7rem", "2xl": "sm" }}
      color="white"
      fontWeight="600"
      px={4}
      whiteSpace="nowrap"
      textAlign="left"
      bg={"blue.400"}
      {...props}
    />
  );
};

export const Td = (props: any) => {
  return (
    <Box
      as="td"
      p={{base: 2, "2xl": 4}}
      borderBottom="1px solid"
      borderBottomColor={useColorModeValue("gray.100", "gray.700")}
      height="40px"
      color={useColorModeValue("black","white")}
      {...props}
    />
  );
};

export const Tr = (props: any) => {
  return (
    <Box
      as="tr"
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      borderBottom="1px solid"
      borderRight="1px solid"
      borderLeft="1px solid"
      borderTop="1px solid"
      borderTopColor={"gray.200"}
      borderBottomColor={"gray.200"}
      borderRightColor={"gray.200"}
      borderLeftColor={"gray.200"}
      height="40px"
      border="none"
      bg={"gray.50"}
      {...props}
    />
  );
};

export const Table = (props: any) => {
  return (
    <Box
      as="table"
      textAlign="left"
      // backgroundColor="white"
      // bg={"white"}
      ml={0}
      w="full"
      mr={0}
      borderRadius={8}
      // boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
      {...props}
    />
  );
};