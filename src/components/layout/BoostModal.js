import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
  Button,
  Input,
  useNumberInput,
  HStack,
} from "@chakra-ui/react";

export default function BoostModal(props) {
  const { isOpen, onClose } = props;
  const toast = useToast();
  const [targetAudience, setTargetAudience] = useState("");

  function HookUsage() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: 10,
        defaultValue: window.localStorage.getItem("amount") || 50,
        min: 1,
        max: 1000000000000000,
        precision: 2,
      });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    useEffect(() => {
      setTargetAudience(window.localStorage.getItem("amount") * 100);
    }, [window.localStorage.getItem("amount")]);

    useEffect(() => {
      console.log(input["aria-valuenow"]);
      window.localStorage.setItem("amount", input["aria-valuenow"]);
    }, [input]);

    return (
      <HStack maxW="260px">
        <Button {...dec}>-</Button>
        <Input {...input} />
        <Button {...inc}>+</Button>
      </HStack>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Boost your content!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>DAIx</FormLabel>
              <HookUsage />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Text mr={3}>Target audience: {targetAudience}</Text>
            <Button colorScheme="green" onClick={async () => {}}>
              Confirm Boost
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
