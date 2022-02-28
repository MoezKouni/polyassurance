import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    HStack,
    useColorModeValue,
  } from "@chakra-ui/react";
import Field from "../Fields";

  
  export default function PermissionBlock({
    permissions,
    section = "Section",
  }: {
    permissions: any;
    section: string;
  }) {
    return (
      <div>
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          rounded="8px"
          border="none"
          bg={"gray.200"}
          my="2"
          p="2"
        >
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                rounded={"md"}
                _focus={{ outline: "none" }}
                _expanded={{ bg: "blue.400", color: "white" }}
              >
                <Box
                  flex="1"
                  textAlign="left"
                  color={useColorModeValue("blue-light", "white")}
                  fontWeight={"medium"}
                >
                  {section.toUpperCase()}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p="2" pb="0">
              <HStack wrap={"wrap"}>
                <Field
                  name="permissions"
                  type="checkbox"
                  checkBoxs={permissions
                    .filter((el: any) => el.name.includes(section))
                    .map((el: any) => ({ value: el._id, label: el.name }))}
                />
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
  