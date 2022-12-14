import {
  Container,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  useMediaQuery,
  Flex,
  Text,
  useCounter,
  HStack,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BoxShadow, hoverColor } from "../Variables";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan492] = useMediaQuery("(min-width: 492px)");

  // const counter = useCounter({
  //   max: 10,
  //   min: 0,
  //   step: 1,
  // });

  const Stays = () => {
    const [stayData, setStayData] = useState({
      city: "",
      checkin: "",
      checkout: "",
      room: 1,
      adult: 1,
      children: 1,
    });

    const onChangeInput = (e) => {
      const { id, value } = e.target;
      setStayData({ ...stayData, [id]: value });
    };

    const onIncrementCounter = (e) => {
      let { id, value } = e.target;
      if (value >= 10) {
        return false;
      }
      value = parseInt(value);
      console.log(value, typeof value);
      setStayData({ ...stayData, [id]: value + 1 });
    };

    const onDecrementCounter = (e) => {
      let { id, value } = e.target;
      if (
        (id == "room" && stayData.room <= 1) ||
        (id == "adult" && stayData.adult <= 1)
      ) {
        return false;
      }
      if (value <= 0) {
        return false;
      }
      value = parseInt(value);
      setStayData({ ...stayData, [id]: value - 1 });
    };

    let navigate = useNavigate();
    const redirect = (e) => {
      localStorage.setItem("staySearch", JSON.stringify(stayData));
      console.log(`redirecting to /stays/${stayData.city}`);
      navigate(`/stays/${stayData.city}`);
    };

    return (
      <>
        <Flex
          flexWrap="wrap"
          justify="space-between"
          gap="2"
          w={isLargerThan768 ? "50%" : "90%"}
        >
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Going to" : "GT"} />
            <Input
              value={stayData.city}
              type="text"
              id="city"
              // onChange={(e) => {
              //   onChangeInput(e);
              // }}
              placeholder="Enter a location e.g.Goa,Bengaluru,Jammu"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Check-in" : "CI"} />
            <Input
              value={stayData.checkin}
              id="checkin"
              // onChange={(e) => {
              //   onChangeInput(e);
              // }}
              type="date"
              placeholder="Basic usage"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Check-out" : "CO"} />
            <Input
              value={stayData.checkout}
              id="checkout"
              // onChange={(e) => {
              //   onChangeInput(e);
              // }}
              type="date"
              placeholder="Basic usage"
            />
          </InputGroup>
          <InputGroup>
            <Popover>
              {/* <PopoverTrigger>
                <Button>
                  Travellers :-{" "}
                  {isLargerThan492
                    ? ` ${stayData.room} room , ${
                        stayData.adult + stayData.children
                      } travellers`
                    : `${stayData.room}R ,  ${
                        stayData.adult + stayData.children
                      }T`}
                </Button>
              </PopoverTrigger> */}
              <Portal>
                <PopoverContent>
                  {/* <PopoverArrow />
                  <PopoverHeader>Travellers</PopoverHeader>
                  <PopoverCloseButton /> */}
                  <PopoverBody>
              
                    <Flex align="center" gap="4" justify="space-between">
                      <Text>Adults </Text>
                      <HStack w="150px" m={2}>
                        <Button
                          id="adult"
                          value={stayData.adult}
                          // onClick={(e) => {
                          //   onIncrementCounter(e);
                          // }}
                        >
                          +
                        </Button>
                        <Input m={2} value={stayData.adult} readOnly={true} />
                        <Button
                          id="adult"
                          value={stayData.adult}
                          // onClick={(e) => {
                          //   onDecrementCounter(e);
                          // }}
                        >
                          -
                        </Button>
                      </HStack>
                    </Flex>
                    <Flex align="center" gap="4" justify="space-between">
                      <Text>Children</Text>
                      <HStack w="150px" m={2}>
                        <Button
                          id="children"
                          value={stayData.children}
                          // onClick={(e) => {
                          //   onIncrementCounter(e);
                          // }}
                        >
                          +
                        </Button>
                        <Input
                          m={2}
                          value={stayData.children}
                          readOnly={true}
                        />
                        {/* <Button
                          id="children"
                          value={stayData.children}
                          onClick={(e) => {
                            onDecrementCounter(e);
                          }}
                        >
                          -
                        </Button> */}
                      </HStack>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </InputGroup>
        </Flex>
        <Button
          colorScheme="blue"
          // onClick={(e) => {
          //   console.log(stayData);
          //   redirect(e);
          // }}
        >
          Search
        </Button>
      </>
    );
  };

  const Packages = () => {
    return (
      <>
        <Flex
          flexWrap="wrap"
          justify="space-between"
          gap="2"
          // w={isLargerThan768 ? "50%" : "90%"}
        >
          <InputGroup>
            <InputLeftAddon
              children={isLargerThan492 ? "Leaving from" : "LF"}
            />
            <Input placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            {/* <InputLeftAddon children={isLargerThan492 ? "Going to" : "GT"} /> */}
            <Input placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            {/* <InputLeftAddon children={isLargerThan492 ? "Check-in" : "CI"} /> */}
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
          <InputGroup>
            {/* <InputLeftAddon children={isLargerThan492 ? "Check-out" : "CO"} /> */}
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
        </Flex>
        <Button colorScheme="blue">Search</Button>
      </>
    );
  };

  const Cars = () => {
    return (
      <>
        <Flex
          flexWrap="wrap"
          justify="space-between"
          gap="2"
          // w={isLargerThan768 ? "50%" : "90%"}
        >
          <InputGroup>
            {/* <InputLeftAddon children={isLargerThan492 ? "Pick-up" : "PL"} /> */}
            <Input placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon
              // children={isLargerThan492 ? "Pick-up date" : "PD"}
            />
            <Input type="date" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon
              // children={isLargerThan492 ? "Drop-off date" : "DD"}
            />
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
        </Flex>
        <Button colorScheme="blue">Search</Button>
      </>
    );
  };

  const Flights = () => {
    return (
      <>
        <Flex
          flexWrap="wrap"
          justify="space-between"
          gap="2"
          // w={isLargerThan768 ? "50%" : "90%"}
        >
          <InputGroup>
            <InputLeftAddon
              // children={isLargerThan492 ? "Leaving from" : "LF"}
            />
            <Input placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            {/* <InputLeftAddon children={isLargerThan492 ? "Going to" : "GT"} /> */}
            <Input placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            {/* <InputLeftAddon children={isLargerThan492 ? "Check-in" : "CI"} /> */}
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
          <InputGroup>
            {/* <InputLeftAddon children={isLargerThan492 ? "Check-out" : "CO"} /> */}
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
        </Flex>
        <Button colorScheme="blue">Search</Button>
      </>
    );
  };
  const TabSection = ({ name }) => {
    return (
      <Tab
        _selected={{
          boxShadow: "none",
          borderBottom: "2px solid blue",
          color: hoverColor,
        }}
        // _hover={{ borderBottom: "1px solid blue", color: hoverColor }}
      >
        {name}
      </Tab>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Container maxW="container.xl">
      {isLoading ? (
        <Flex justify="center" mt={"5"}>
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#3182ce"
            size="lg"
          />
        </Flex>
      ) : (
        <>
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="10px"
            overflow={"hidden"}
            marginTop="50"
            boxShadow={BoxShadow}
          >
            <Tabs align="center">
              <TabList w="90%">
                <Flex
                  flexWrap="wrap"
                  justify="center"
                  // gap={isLargerThan768 ? "2" : null}
                >
                  <TabSection name={"Stays"} />
                  <TabSection name={"Flights"} />
                  <TabSection name={"Cars"} />
                  <TabSection name={"Packages"} />
                  <TabSection name={"Things to do"} />
                </Flex>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stays />
                </TabPanel>
                <TabPanel>
                  <Flights />
                </TabPanel>
                <TabPanel>
                  <Cars />
                </TabPanel>
                <TabPanel>
                  <Packages />
                </TabPanel>
                <TabPanel>
                  <Stays />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Container
            boxShadow={BoxShadow}
            maxW="container.xl"
            mt="50px"
            borderRadius="10px"
            bgImage="url('https://a.travel-assets.com/travel-assets-manager/ux-887/Global-HP-Hero-928x398.jpg')"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
          >
            <Flex
              h="400px"
              direction="column"
              gap={10}
              justify="center"
              align="center"
              p={5}
              textAlign="center"
              color="white"
              textShadow="0 0 20px black"
              fontWeight="bold"
            >
              <Box>
                <Heading as="h1" color="white">
                  Save instantly with Expedia Rewards
                </Heading>
              </Box>
              <Box>
                <Text color="white" fontSize="xl">
                  You can enjoy access to perks like Member Prices, saving you
                  10% or more on select hotels. Terms may apply.
                </Text>
              </Box>
              <Box>
                <Link to="/" mb="5%" mt="2%" w="200px" size="lg">
                  <Button
                    mb="5%"
                    mt="2%"
                    w="200px"
                    colorScheme="blue"
                    size="lg"
                  >
                    See Member Prices
                  </Button>
                </Link>
              </Box>
            </Flex>
          </Container>
          <Container
            boxShadow={BoxShadow}
            maxW="container.xl"
            borderRadius="10px"
            bgImage="url('https://a.travel-assets.com/travel-assets-manager/gmvd-1482-bookearly-emea/667x320.jpg')"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            mt={"50px"}
            h={"300px"}
          >
            <Flex
              h="400px"
              direction="column"
              justify="center"
              align="center"
              p={5}
              textAlign="center"
              color="white"
              textShadow="0 0 20px black"
              fontWeight="bold"
              gap={"30px"}
            >
              <Box>
                <Heading as="h3" color="white" fontSize="20px">
                  Plan ahead and save
                </Heading>
              </Box>
              <Box>
                <Heading as="h3" color="white" fontSize="20px">
                  Book 60 days in advance for 20% off seletct stays.
                </Heading>
              </Box>
            </Flex>
          </Container>
        </>
      )}
    </Container>
  );
}

export default Main;
