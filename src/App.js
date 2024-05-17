import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  Input,
  VStack,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Container,
  useToast,
  Card,
  CardBody,
  Heading,
  Divider,
  HStack,
} from "@chakra-ui/react";

function App() {
  const [country, setCountry] = useState("us");
  const [zipCode, setZipCode] = useState("");
  const [fetchedData, setFetchedData] = useState();
  const toast = useToast();

  useEffect(() => {
    setFetchedData();
    setZipCode("");
  }, [country]);

  useEffect(() => {
    if (country && zipCode.length === 5) {
      fetch(`https://api.zippopotam.us/${country}/${zipCode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && Object.keys(data).length === 0)
            toast({
              title: "Not found",
              status: "error",
              position: "top",
              duration: 1000,
            });
          else {
            setFetchedData(data);
          }
          console.log(data);
        })
        .catch((error) => console.error("err", error));
    } else {
      setFetchedData();
    }
  }, [country, zipCode, toast]);

  return (
    <Box height={"100vh"} backgroundColor={"orange.100"} pt={20}>
      <Container
        border={"2px solid orange"}
        borderRadius={"10px"}
        bg={"orange.50"}
        p={5}
        maxW={"container.md"}
        boxShadow={"xl"}
      >
        <Box>
          <Heading size={"2xl"}>Discover your ZIP code info</Heading>
          <Divider
            mt={5}
            orientation="horizontal"
            opacity={0.8}
            borderWidth={1}
          />
        </Box>
        <Flex p={4} alignItems="flex-start">
          <Box flex="1" maxWidth={"xs"}>
            <VStack spacing={4} align="stretch">
              <FormControl id="country-select">
                <FormLabel>Country</FormLabel>
                <Select
                  value={country}
                  bg={"white"}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="us">United States</option>
                  <option value="de">Germany</option>
                </Select>
              </FormControl>
              <FormControl id="zip-code-input">
                <FormLabel>Zip Code</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter zip code"
                  value={zipCode}
                  bg={"white"}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </FormControl>
            </VStack>
          </Box>
          <Box fontSize={"xl"} flex="1" ml={8}>
            {fetchedData && (
              <Card>
                <CardBody>
                  <Heading size={"lg"}>RESULTS OVERVIEW</Heading>
                  <Divider m={2} orientation="horizontal" />
                  <Box>
                    <HStack>
                      <Text fontWeight={"semibold"}>Country:</Text>
                      <Text>{fetchedData["country"]}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight={"semibold"}>City:</Text>
                      <Text>{fetchedData["places"][0]["place name"]}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight={"semibold"}>State:</Text>
                      <Text>{fetchedData["places"][0]["state"]}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight={"semibold"}>Longitude: </Text>
                      <Text>{fetchedData["places"][0]["longitude"]}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight={"semibold"}>Latitude: </Text>
                      <Text>{fetchedData["places"][0]["latitude"]}</Text>
                    </HStack>
                  </Box>
                </CardBody>
              </Card>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default App;
