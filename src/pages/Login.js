import React, { useRef, useState } from "react";
import {
  Button,
  Heading,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../api";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const toast = useToast();
  const handleLogin = async () => {
    console.log("handleLogin");
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (!emailRef.current.value || !passwordRef.current.value)
      return toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    // if (emailRef.current.value === "admin@gmail.com" && passwordRef.current.value === "admin") {
    //     toast({
    //         title: "Success",
    //         description: "Login successful",
    //         status: "success",
    //         duration: 3000,
    //         isClosable: true,
    //     })
    //     navigate('/')
    // }
    try {
      let body = {
        email: email,
        password: password,
      };
      let { data } = await signinUser(body);
      if (data.token) {
        toast({
          title: "Success",
          description: "Login successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        console.log(data);
        localStorage.setItem("auth", data.token);
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    // .then(({ token }) => {
    //     if (token) {
    //         localStorage.setItem('jwt', token);
    //         setLoggedIn(true);
    //         setEmail(email);
    //         getInitialData();
    //         history.push('/');
    //     }
    // })
    // .catch(() => {
    //     setLoggedIn(false);
    //     setIsInfoTooltipOpen({
    //         open: true,
    //         message: SOMETHING_WRONG,
    //         success: false,
    //     });
    // });
  };
  return (
    <Stack
      align="center"
      justifyContent="center"
      w="100%"
      h="100vh"
      bgGradient="linear(to-l, #F4DC92, #D0A07A,#363F68)"
    >
      <Stack>
        {show ? (
          <Stack
            rounded={"15px"}
            bg="white"
            py={5}
            px={10}
            w="md"
            align="center"
            spacing={5}
          >
            <Heading color="#5f5f5f">Careers Portal</Heading>
            <Input
              px={5}
              py={2}
              variant="unstyled"
              border={"1px solid #790202"}
              ref={emailRef}
              type="email"
              placeholder="Email"
              fontWeight="extrabold"
            />
            <Input
              px={5}
              py={2}
              variant="unstyled"
              border={"1px solid #790202"}
              ref={passwordRef}
              type="password"
              placeholder="Password"
              fontWeight="extrabold"
            />
            <Button
              variant="unstyled"
              bg="white"
              color="#790202"
              border={"1px solid #790202"}
              px={5}
              py={2}
              w="50%"
              onClick={() => handleLogin()}
              _hover={{
                bg: "#790202",
                color: "white",
              }}
              _active={{
                bg: "#ba1117",
                color: "white",
              }}
            >
              Login
            </Button>
            <Stack direction="row" w="100%" justify="end">
              <Image
                src="https://ik.imagekit.io/o0spphqdc/Ample_Logo_BOFaUuOQn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671344685069"
                alt="Levya"
                w="100px"
                h="30px"
                objectFit={"contain"}
              />
            </Stack>
          </Stack>
        ) : (
          <Stack
            h="300px"
            spacing={20}
            rounded={"15px"}
            bg="white"
            py={5}
            px={10}
            w="md"
            align="center"
          >
            <Heading color="#5f5f5f">Careers Portal</Heading>
            <Button
              variant="unstyled"
              bg="white"
              color="#790202"
              border={"1px solid #790202"}
              px={5}
              py={2}
              w="xs"
              onClick={() => setShow(true)}
              _hover={{
                bg: "#790202",
                color: "white",
              }}
              _active={{
                bg: "#ba1117",
                color: "white",
              }}
            >
              Login
            </Button>
            <Stack direction="row" w="100%" justify="end">
              <Image
                src="https://ik.imagekit.io/o0spphqdc/Ample_Logo_BOFaUuOQn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671344685069"
                alt="Levya"
                w="100px"
                h="30px"
                objectFit={"contain"}
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default Login;
