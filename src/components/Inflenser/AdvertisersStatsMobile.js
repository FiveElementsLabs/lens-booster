import {
  Box,
  Avatar,
    Button,
    Text,
    Divider,
  Flex
} from "@chakra-ui/react";

import {  TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {useState} from 'react'

export default function AdvertisersStatsMobile() {
    
    const ads = [
        {
            name: 'InterFC',
            title: 'Fan Token summer special promotion',
            earned: "$ 236.50",
            mirrors: "120",
            clicks: "54",
            events: "32",
            totalEarn: "$ 432.78"
        },
         {
            name: 'MilanFC',
            title: 'Fan Token summer special promotion',
            earned: "$ 236.50",
            mirrors: "120",
            clicks: "54",
            events: "32",
            totalEarn: "$ 432.78"
        }
    ]
  return (
      <><Box  mt={4}
        p={5}
        borderRadius="20px"
        boxShadow="lg"
        bg="#ffffff"
        color="#5C6F81">
          {ads.map(ad => (
            <>
              <AdStats  advertisers={ad} />
                  <Divider  borderColor="#BFC1C6" />
              </>
          ))}
         </Box>
    </>
  )
}


const AdStats = ({ ...ad }) => {
    const [settingState, setSettingState] = useState(false)
    const [advertisers, setAdvertisers] = useState(ad.advertisers)
    return (<> <Box py={1}
       
      >
              <Button color="#00203F" justifyContent="space-between" fontFamily="'Prompt', sans-serif" align="left" rightIcon={ !settingState ? <TriangleDownIcon color="#FF6827" /> : <TriangleUpIcon color="#FF6827" />}
              bg="#ffffff"
                  w="100%"
            paddingInlineStart={0}
            paddingInlineEnd={0}
                  _focus={{
                      boxShadow:
                        '0 0 0 0 rgba(88, 144, 255, .75), 0 0 0 rgba(0, 0, 0, .15)',
                    }}
                    _hover={{ bg: '#ffffff' }}
                    _active={{
                      bg: '#ffffff',
                      transform: 'scale(1)',
                      borderColor: '#ffffff',
                    }}
             onClick={() => setSettingState(!settingState)}>
                <Flex alignItems="center">
                 <Avatar
                    name="InterFC"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png"
                    size="sm"
                    mr={2}
                    fontWeight={600}
                  />
                {advertisers.name}
                </Flex>
        </Button>
        
        <Box display={settingState ? 'block' : 'none'} textAlign="left">
            <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">Campaing title</Text>
            <Text fontSize={15} color="#00203F">{advertisers.title}</Text>
            <Divider borderColor="#BFC1C6" />

            <Text fontSize={28} color="#1A4587"  fontFamily="'Prompt', sans-serif">Earned</Text>
            <Text fontSize={15} color="#5C6F81">{advertisers.earned}</Text>
            <Divider borderColor="#BFC1C6" />

            <Text fontSize={28} color="#1A4587"  fontFamily="'Prompt', sans-serif">Mirrors</Text>
            <Text fontSize={15} color="#5C6F81">{advertisers.mirros}</Text>
            <Divider borderColor="#BFC1C6" />

            <Text fontSize={28} color="#1A4587"  fontFamily="'Prompt', sans-serif">Clicks</Text>
            <Text fontSize={15} color="#5C6F81">{advertisers.clicks}</Text>
            <Divider borderColor="#BFC1C6" />

            <Text fontSize={28} color="#1A4587"  fontFamily="'Prompt', sans-serif">Events</Text>
            <Text fontSize={15} color="#5C6F81">{advertisers.events}</Text>
            <Divider borderColor="#BFC1C6" />

            <Text fontSize={28} color="#1A4587"  fontFamily="'Prompt', sans-serif">Total earn</Text>
            <Text fontSize={15} color="#5C6F81">{advertisers.totalEarn}</Text>
            <Divider borderColor="#BFC1C6" />
        </Box>
              



      </Box></>)
}