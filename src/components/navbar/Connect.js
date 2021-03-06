import { CopyIcon } from '@chakra-ui/icons';
import { useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useSharedState } from '../../context/store.js';
import { useWallet } from '../../hooks/useWallet.js';
import { shortenAddress } from '../../utils/utils.js';
import {
  Box,
  Text,
  Flex,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  useClipboard,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react';

export default function Connect(props) {
  const [{ account }] = useSharedState();

  const {
    isOpen,
    //onOpen,
    onClose,
  } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(account || '');
  const { loginWallet } = useWallet();

  return (
    <>
      {!account ? (
        <Button onClick={loginWallet} height={{ base: '28px', md: '34px' }}>
          {window.innerWidth <= 640 ? 'LENS LOGIN' : 'LOGIN WITH LENS'}
        </Button>
      ) : (
        <Button height={{ base: '28px', md: '34px' }}>{shortenAddress(account)}</Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('light_background', 'dark_background')}>
          <ModalHeader>Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box id="modal-account-card" padding={3} mb={4} rounded="lg">
              <Text mb={1}>Connected with Metamask:</Text>
              <Text mb={3} fontWeight="bold" fontSize="sm">
                {account}
              </Text>
              <Flex>
                <Button mr={6} size="sm" rightIcon={<CopyIcon />} onClick={onCopy}>
                  {hasCopied ? 'Copied' : 'Copy'}
                </Button>
              </Flex>
            </Box>

            <Flex mb={3} id="modal-buttons">
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
              >
                Disconnect wallet
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
