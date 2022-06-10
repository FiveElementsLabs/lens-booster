import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Avatar,
} from "@chakra-ui/react";

export default function AdvertisersStats() {
  return (
    <>
      <Box mt={8} p={5} borderRadius="20px" boxShadow="lg" bg="#ffffff">
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr borderColor="gray.500">
                <Th fontSize={16} color="#1A4587">
                  Advertiser
                </Th>
                <Th fontSize={16} color="#1A4587">
                  Campaign title
                </Th>
                <Th fontSize={16} color="#1A4587">
                  Earned
                </Th>
                <Th fontSize={16} color="#1A4587">
                  Mirrors
                </Th>
                <Th fontSize={16} color="#1A4587">
                  Clicks
                </Th>
                <Th fontSize={16} color="#1A4587">
                  Events
                </Th>
                <Th fontSize={16} color="#1A4587">
                  Total earn
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize={20} color="#00203F">
                  <Avatar
                    name="InterFC"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png"
                    size="xs"
                    mr={2}
                    fontWeight={600}
                  />
                  INTER FC
                </Td>

                <Td fontSize={15} color="#00203F" fontWeight={600}>
                  Fan Token summer special promotion
                </Td>
                <Td>$ 236.50</Td>
                <Td>106</Td>
                <Td>114</Td>
                <Td>59</Td>
                <Td>$ 623.25</Td>
              </Tr>

              <Tr>
                <Td fontSize={20} color="#00203F">
                  <Avatar
                    name="InterFC"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png"
                    size="xs"
                    mr={2}
                  />
                  INTER FC
                </Td>
                <Td fontSize={15} color="#00203F" fontWeight={600}>
                  Fan Token summer special promotion
                </Td>
                <Td>$ 236.50</Td>
                <Td>106</Td>
                <Td>114</Td>
                <Td>59</Td>
                <Td>$ 623.25</Td>
              </Tr>
              <Tr>
                <Td fontSize={20} color="#00203F">
                  <Avatar
                    name="InterFC"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png"
                    size="xs"
                    mr={2}
                  />
                  INTER FC
                </Td>
                <Td fontSize={15} color="#00203F" fontWeight={600}>
                  Fan Token summer special promotion
                </Td>
                <Td>$ 236.50</Td>
                <Td>106</Td>
                <Td>114</Td>
                <Td>59</Td>
                <Td>$ 623.25</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
