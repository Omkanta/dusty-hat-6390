import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { AiFillGift, AiFillShop } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsBag, BsFillPersonFill } from "react-icons/bs";
import "../CSS/Navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { forToast } from "../Redux/authReducer/action";

const Navbar = () => {
  const [Width, setWidth] = useState(window.innerWidth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const MenuOverlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const DetectWindowSize = () => {
    setWidth(window.innerWidth);
  };

  //for auth---------->
  const { isAuth } = useSelector((store) => {
    return store.authReducer;
  });

  //================>

  // console.log(isAuth);
  useEffect(() => {
    window.addEventListener("resize", DetectWindowSize);

    return () => {
      window.removeEventListener("resize", DetectWindowSize);
    };
  }, [Width]);

  const handleLogout = () => {
    localStorage.removeItem("activeid");
    navigate("/");
    forToast(toast, "Logout Successfull", "success");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {Width > 1100 && (
        <Box bg="#e9edc9">
          <Flex
            p="10px 50px"
            justifyContent={"space-between"}
            w="90%"
            m="auto"
            direction={["column", "row"]}
            gap="10px"
          >
            <Flex
              alignItems={"center"}
              justifyContent="space-around"
              gap="20px"
            >
              <AiFillGift
                size={Width > 710 ? " 25px" : "50px"}
                color="#f2cc8f"
              />
              <Text>
                LIT Liquid Matte Lipstick + LIT Valvet Liquid Matte Lipstick GET
                this @ Re 1
              </Text>
              <Text
                color="#f2cc8f"
                cursor={"pointer"}
                m="0px 20px"
                fontWeight={"bold"}
              >
                Shop Now
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap="10px" cursor={"pointer"}>
              <AiFillShop size="20px" />
              <Text>MyGlamm Store</Text>
            </Flex>
          </Flex>
        </Box>
      )}
      {Width < 600 ? (
        <Box p="10px">
          <Flex
            justifyContent={"space-around"}
            alignItems="center"
            direction={["column", "row"]}
            gap="10px"
          >
            <Image
              w="20%"
              src="https://i.postimg.cc/vmxpvTLp/Glamour-Logo-cropped.jpg"
            />
            <Flex
              alignItems={"center"}
              border="1px solid gray"
              p="10px 20px"
              fontSize={"20px"}
              borderRadius={"10px"}
              margin="0px 30px"
            >
              <button style={{ margin: "0px 10px" }}>
                <FiSearch size="25px" />
              </button>
              <input
                className="search-input"
                style={{
                  border: "none",
                  padding: "0px 10px",
                  width: Width < 300 ? "100px" : "200px",
                }}
                placeholder="Find Lipstick, Eyeliner, MakeUP tutorial, etc. "
              />

            </div>
          </Flex>
          <Flex justifyContent={"space-around"} alignItems="center" gap="20px">
            <Link to={"/cart"}>
              {" "}
              <BsBag size="30px" cursor={"pointer"} />
            </Link>

            {/* <Link to={'/userdashboard'}><Avatar size='sm'>
              <AvatarBadge  boxSize='1.25em' bg='green.500' />
            </Avatar></Link> */}
            {isAuth ? (
              <Popover >
                <PopoverTrigger>
                  <Avatar size="sm" cursor={"pointer"}>
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight={'700'}>Dashboard</PopoverHeader>
                  <PopoverBody textAlign={'left'} fontWeight={'500'} cursor='pointer' >
                    <Text _hover={{textDecoration:'underline'}} mb='5px'>Update your profile</Text>
                    <Text _hover={{textDecoration:'underline'}} mb='5px'>Your order</Text>
                    <Text _hover={{textDecoration:'underline'}} mb='10px'>Your cart item</Text>
                    <Button
                      _hover={{ bg: "red", color: "white" }}
                      bg="pink"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : (
              <Link to={"/login"}>
                {" "}
                <BsFillPersonFill size="30px" cursor={"pointer"} />
              </Link>
            )}

            </Flex>

          </Flex>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Box m="20px">
              <Button
                onClick={() => {
                  MenuOverlay();
                  onOpen();
                }}
                colorScheme={"#f2cc8f"}
                color="black"
              >
                <RxHamburgerMenu style={{ marginRight: "10px" }} size="30px" />
              </Button>
              <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                  <ModalHeader>Menu</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <SimpleGrid columns={[1, 2]} gap="10px">
                      <Box>
                        <Text
                          className="navbar-items"
                          onClick={() => navigate("/")}
                        >
                          HOME
                        </Text>
                      </Box>
                      <Box>
                        <Menu>
                          <MenuButton className="navbar-items">
                            MakeUp
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 1
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 2
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 3
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 4
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                      <Box>
                        <Menu>
                          <MenuButton className="navbar-items">
                            HAIR CARE
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 1
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 2
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 3
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 4
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                      <Box>
                        <Menu>
                          <MenuButton className="navbar-items">
                            BATH & BODY
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 1
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 2
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 3
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 4
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                      <Box>
                        <Menu>
                          <MenuButton className="navbar-items">
                            SKINCARE
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 1
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 2
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 3
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 4
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                      <Box>
                        <Menu>
                          <MenuButton className="navbar-items">
                            SANITIZING CARE
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 1
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 2
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 3
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 4
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                      <Box>
                        <Menu>
                          <MenuButton className="navbar-items">
                            COLLECTION
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 1
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 2
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 3
                            </MenuItem>
                            <MenuItem
                              className="hvr-underline-from-center"
                              bg="none"
                            >
                              Item 4
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                      <Box>
                        <Text className="navbar-items">MYGLAMM STUDIO</Text>
                      </Box>
                      <Box>
                        <Text className="navbar-items">OFFERS</Text>
                      </Box>
                    </SimpleGrid>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
            <Flex
              justifyContent={"space-around"}
              alignItems="center"
              gap="20px"
            >
              <Link to={"/cart"}>
                {" "}
                <BsBag size="30px" cursor={"pointer"} />
              </Link>
              |
              {isAuth ? (
                <Popover>
                  <PopoverTrigger>
                    <Avatar size="sm" cursor={"pointer"}>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight={"700"}>Dashboard</PopoverHeader>
                    <PopoverBody
                      textAlign={"left"}
                      fontWeight={"500"}
                      cursor="pointer"
                    >
                      <Text _hover={{ textDecoration: "underline" }} mb="5px">
                        Update your profile
                      </Text>
                      <Text _hover={{ textDecoration: "underline" }} mb="5px">
                        Your order
                      </Text>
                      <Text _hover={{ textDecoration: "underline" }} mb="10px">
                        Your cart item
                      </Text>
                      <Button
                        _hover={{ bg: "red", color: "white" }}
                        bg="pink"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link to={"/login"}>
                  {" "}
                  <BsFillPersonFill size="30px" cursor={"pointer"} />
                </Link>
              )}
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Box bg="#ffffff" p="20px">
          <Flex
            justifyContent={"space-between"}
            alignItems="center"
            direction={["column", "row"]}
            gap="30px"
          >
            <Flex
              justifyContent={"space-around"}
              alignItems="center"
              direction={["column", "row"]}
            >
              <Image
                w="20%"
                src="https://i.postimg.cc/vmxpvTLp/Glamour-Logo-cropped.jpg"
              />
              <Flex
                alignItems={"center"}
                border="1px solid gray"
                p="10px 20px"
                fontSize={"20px"}
                borderRadius={"10px"}
                margin="0px 30px"
              >
                <button style={{ margin: "0px 10px" }}>
                  <FiSearch size="25px" />
                </button>
                <input
                  className="search-input"
                  style={{
                    border: "none",
                    padding: "0px 10px",
                    width: Width < 900 ? "200px" : "500px",
                  }}
                  placeholder="Find Lipstick, Eyeliner, MakeUP tutorial, etc. "
                />
              </Flex>
            </Flex>
            <Flex
              justifyContent={"space-around"}
              alignItems="center"
              gap="20px"
            >
              <Link to={"/cart"}>
                {" "}
                <BsBag size="30px" cursor={"pointer"} />
              </Link>
              |
              {isAuth ? (
                <Popover>
                  <PopoverTrigger>
                    <Avatar size="sm" cursor={"pointer"}>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight={"700"}>Dashboard</PopoverHeader>
                    <PopoverBody
                      textAlign={"left"}
                      fontWeight={"500"}
                      cursor="pointer"
                    >
                      <Text _hover={{ textDecoration: "underline" }} mb="5px">
                        Update your profile
                      </Text>
                      <Text _hover={{ textDecoration: "underline" }} mb="5px">
                        Your order
                      </Text>
                      <Text _hover={{ textDecoration: "underline" }} mb="10px">
                        Your cart item
                      </Text>
                      <Button
                        _hover={{ bg: "red", color: "white" }}
                        bg="pink"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link to={"/login"}>
                  {" "}
                  <BsFillPersonFill size="30px" cursor={"pointer"} />
                </Link>
              )}
            </Flex>
          </Flex>
          <Box>
            <SimpleGrid
              gap="10px"
              columns={[2, 3, 5, 10]}
              w="95%"
              m="auto"
              mt="20px"
            >
              <Box>
                <Text className="navbar-items" onClick={() => navigate("/")}>
                  HOME
                </Text>
              </Box>
              <Box>
                <Menu>
                  <MenuButton className="navbar-items">MakeUp</MenuButton>
                  <MenuList>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 1
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 2
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 3
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 4
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Menu>
                  <MenuButton className="navbar-items">HAIR CARE</MenuButton>
                  <MenuList>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 1
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 2
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 3
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 4
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Menu>
                  <MenuButton className="navbar-items">BATH & BODY</MenuButton>
                  <MenuList>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 1
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 2
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 3
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 4
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Menu>
                  <MenuButton className="navbar-items">SKINCARE</MenuButton>
                  <MenuList>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 1
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 2
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 3
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 4
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Menu>
                  <MenuButton className="navbar-items">
                    SANITIZING CARE
                  </MenuButton>
                  <MenuList>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 1
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 2
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 3
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 4
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Menu>
                  <MenuButton className="navbar-items">COLLECTION</MenuButton>
                  <MenuList>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 1
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 2
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 3
                    </MenuItem>
                    <MenuItem className="hvr-underline-from-center" bg="none">
                      Item 4
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Text className="navbar-items">MYGLAMM STUDIO</Text>
              </Box>
              <Box>
                <Text className="navbar-items">OFFERS</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Navbar;
