import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { isValidateEmail } from "../utitlityFunctions";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [OTP, setOTP] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  //   CHECKING EMAIL
  const checkEmail = () => {
    setIsCheckingEmail(true);
    let valid = true;
    setTimeout(() => {
      console.log("email verified");
      setIsCheckingEmail(false);
      if (valid) {
        onOpen();
      } else {
        toast({
          title: "Enter a valid email.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }, 2000);
  };
  //   VERIFY OTP
  const verifyOTP = () => {
    setIsVerifyingOTP(true);
    setTimeout(() => {
      let verified = true;
      if (verified) {
        setIsVerifyingOTP(false);
        onClose();
        setVerified(true);
      } else {
        toast({
          title: "Wrong OTP.",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsVerifyingOTP(false);
      }
    });
  };

  //   RESET PASSWORD
  const resetPassword = () => {
    setIsResetting(true);
    setTimeout(() => {
      let resetSuccessfully = true;
      if (resetSuccessfully) {
        setIsResetting(true);
        return navigate("/login");
      } else {
        toast({
          title: "Reset password unsuccessful.",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsResetting(false);
      }
    });
  };
  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      {verified ? (
        <Box rounded={"15px"} bg="white" py={5} px={10} w="md" align="center">
          <Heading color="black">Reset Password</Heading>
          <Box>
            <Text mt={5} textAlign="start">
              New password
            </Text>
            <Input
              mt={3}
              px={5}
              py={2}
              variant="unstyled"
              border={"1px solid #790202"}
              type="password"
              onChange={(e) => {
                console.log(e.target.value);
                setNewPassword(e.target.value);
              }}
            />
            <Text mt={5} textAlign="start">
              Confirm new password
            </Text>
            <Input
              mt={3}
              px={5}
              py={2}
              variant="unstyled"
              border={"1px solid #790202"}
              type="password"
              onChange={(e) => {
                console.log(e.target.value);
                setConfirmNewPassword(e.target.value);
              }}
            />
            <Button
              isLoading={isResetting}
              isDisabled={
                newPassword === "" || newPassword !== confirmNewPassword
              }
              mt={3}
              variant="outline"
              colorScheme="red"
              bg="white"
              onClick={() => {
                resetPassword();
              }}
            >
              Reset password
            </Button>
          </Box>
        </Box>
      ) : (
        <Box rounded={"15px"} bg="white" py={5} px={10} w="md" align="center">
          <Heading color="black">Forgot Password</Heading>
          <Text mt={3}>
            Please enter the email you use to sign in to ample.
          </Text>
          <Box>
            <Input
              mt={5}
              px={5}
              py={2}
              variant="unstyled"
              border={"1px solid #790202"}
              placeholder="Email"
              onChange={(e) => {
                console.log(e.target.value);
                setEmail(e.target.value);
              }}
            />
            <Button
              isLoading={isCheckingEmail}
              isDisabled={!isValidateEmail(email)}
              mt={3}
              variant="unstyled"
              textAlign="center"
              bg="white"
              color="#790202"
              border={"1px solid #790202"}
              px={5}
              py={2}
              onClick={() => {
                checkEmail();
              }}
              w="80%"
              _hover={{
                bg: "#790202",
                color: "white",
              }}
              _active={{
                bg: "#ba1117",
                color: "white",
              }}
            >
              Request password reset
            </Button>
          </Box>
        </Box>
      )}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              We have sent an OTP to the email address.
            </Text>
            <Input
              mt={5}
              px={5}
              py={2}
              variant="unstyled"
              border={"1px solid #790202"}
              placeholder="Enter the OTP here"
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter gap={2}>
            <Button
              variant="outline"
              colorScheme="red"
              bg="white"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              isLoading={isVerifyingOTP}
              variant="ghost"
              onClick={() => {
                verifyOTP();
              }}
            >
              Verify
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ForgotPasswordPage;
