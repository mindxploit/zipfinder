import React, { useState, useEffect } from "react";
import { Box, Select, Input, VStack, Text } from "@chakra-ui/react";

function App() {
  const [country, setCountry] = useState("us");
  const [zipCode, setZipCode] = useState("");
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    if (country && zipCode) {
      fetch(`https://api.zippopotam.us/${country}/${zipCode}`)
        .then((response) => response.json())
        .then((data) => data.length && setFetchedData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [country, zipCode]);

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="us">United States</option>
          <option value="de">Germany</option>
        </Select>
        <Input
          type="number"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        {fetchedData && (
          <Box>
            <Text>Country: {fetchedData["country"]}</Text>
            <Text>Place Name: {fetchedData["places"][0]["place name"]}</Text>
            <Text>State: {fetchedData["places"][0]["state"]}</Text>
            <Text>Longitude: {fetchedData["places"][0]["longitude"]}</Text>
            <Text>Latitude: {fetchedData["places"][0]["latitude"]}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default App;
