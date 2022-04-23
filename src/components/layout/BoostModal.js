import { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
  Button,
  Input,
  useNumberInput,
  HStack,
} from "@chakra-ui/react";

import createIndex from "../superfluid/createIndex";

export default function BoostModal(props) {
  const { isOpen, onClose } = props;
  const toast = useToast();

  function HookUsage() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: 10,
        defaultValue: 50,
        min: 1,
        max: 1000000000000000,
        precision: 2,
      });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

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
            <Button
              colorScheme="green"
              onClick={async () => {
                const id = await createIndex();
                window.localStorage.setItem("indexID", id);
                // window.localStorage.setItem("amount", 0);
                toast({
                  title: "You've just created a new Index: " + id,
                  status: "success",
                  position: "bottom-right",
                  variant: "solid",
                });
              }}
            >
              Confirm Boost
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
