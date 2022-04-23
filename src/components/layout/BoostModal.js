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
  Button,
  Input,
  useNumberInput,
  HStack
} from "@chakra-ui/react";

import createIndex from '../superfluid/createIndex';

export default function BoostModal(props) {
  const { isOpen, onClose } = props;

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
              <HookUsage/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={createIndex}>Confirm Boost</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
