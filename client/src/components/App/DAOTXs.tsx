import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Box,
  Flex,
  Heading,
  Link as ChakraLin,
  Spacer,
  Stack,
  Card,
  CardBody,
  CardHeader,
  Text,
  Center
} from '@chakra-ui/react';
import { DarkModeSwitch } from '../DarkModeSwitch';

import { useDao } from '../../context/DAOContext';
import { formattedAddress } from '../../lib/formattedAddress';

import SimulatedDAOTeasury from '../../assets/SimulatedDAOTreasury.json';

import { NFTCard } from './NFTCard';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const DAOTXs = () => {
  const [txs, setTXs] = useState([]);
  const { daoAddress, setDaoAddress } = useDao();

  const { abi: DAOAbi, address: DAOAddress } = SimulatedDAOTeasury;

  const punkLink =
    'https://cdn.dribbble.com/users/2200637/screenshots/17470306/media/378cb6b7c1e9c4b264d5233cad3f71de.jpg?compress=1&resize=400x300';

  const boredApe =
    'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg';

  const pullTXs = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
        
    let DAO = new ethers.Contract(DAOAddress as `0x${string}`, DAOAbi, signer);

    let totalTXCount = (await DAO.getTransactionCount()).toNumber();

    let totalTXs = [];

    if (totalTXCount > 0) {
        for (let i = 0; i < totalTXCount; i++) {
            totalTXs.push(await DAO.transactions(i));
        }
    }

    setTXs(totalTXs);
  };

  useEffect(() => {
    pullTXs();
  }, []);

  const getTXCards = () => {
    let txCards = [];

    for (let tx in txs) {
        txCards.push(<Card key={tx} width="30vw" background="blackAlpha.400">
            <CardBody>
                <Center>
                    <Text>{txs[tx][3] ? "Completed TX" : "Pending TX"}</Text>
                </Center>
            </CardBody>
        </Card>);
    }

    return txCards;
  }

  return (
    <>
      <Card align='center' overflowY="scroll" maxH="40vh" h="40vh">
        <CardHeader>
          <Heading size='md'>⚙️ DAO TXs</Heading>
        </CardHeader>
        <CardBody>
          <Flex flexDirection="column">
            {getTXCards()}
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};