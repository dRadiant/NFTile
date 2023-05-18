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
  Grid,
} from '@chakra-ui/react';
import { DarkModeSwitch } from '../DarkModeSwitch';

import { useDao } from '../../context/DAOContext';
import { formattedAddress } from '../../lib/formattedAddress';

import { NFTCard } from './NFTCard';

import { useContractRead } from 'wagmi';

import { ethers } from "ethers";

import SimulatedDAOTreasury from '../../assets/SimulatedDAOTreasury.json';
import { useEffect, useState } from 'react';

export const DAOInfo = () => {
  const { daoAddress, setDaoAddress } = useDao();
  const [dataReads, setDataReads] = useState<any>([]);
  const [superJanky, setSuperJanky] = useState<any>(
    Array.from({ length: 100 }, () => true)
  );

  const GnosisMultisig = '0xFd9b9A6B5f99f854d36FFEB801AFe4CC7f7ab982';

  const punkLink =
    'https://cdn.dribbble.com/users/2200637/screenshots/17470306/media/378cb6b7c1e9c4b264d5233cad3f71de.jpg?compress=1&resize=400x300';

  const boredApe =
    'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg';

  const ZKEVM = '/PolygonZKEVM.png';

  const loadStuff = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let simulatedDAO = new ethers.Contract(
      SimulatedDAOTreasury.address as `0x${string}`,
      SimulatedDAOTreasury.abi,
      signer
    );

    let tokensInDAO = [];

    for (let i = 0; i < Infinity; i++) {
      try {
        tokensInDAO.push(
          await simulatedDAO.tokenAddresses(i)
        );
      } catch (e) {
        break;
      }
    }

    setDataReads(tokensInDAO);
  };

  useEffect(() => {
    loadStuff();
    const interval = setInterval(() => loadStuff(), 2000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  console.log(dataReads[0]?.underlyingToken?.tokenId.toString());

  return (
    <>
      <Card align='center' overflowY='scroll' maxH='40vh' h='40vh'>
        <CardHeader>
          <Heading size='md'>🖼️ DAO NFTs</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns='repeat(3, 1fr)' p={6}>
            {daoAddress === '0xD533a949740bb3306d119CC777fa900bA034cd52' && (
              <>
                <NFTCard
                  image={punkLink}
                  title='Punk #123'
                  description='Punk'
                />
                <NFTCard image={boredApe} title='Ape #524' description='Punk' />
                <NFTCard
                  image={ZKEVM}
                  title='Polygon ZKEVM NFT #2352'
                  description='Punk'
                />
              </>
            )}
            {daoAddress === '0xFd9b9A6B5f99f854d36FFEB801AFe4CC7f7ab982' && (
              <>
                {dataReads.map((token, index) => (
                  <NFTCard
                    key={index}
                    image={ZKEVM}
                    title={`Mock NFT #${token?.underlyingToken?.tokenId.toString()}`}
                    seed={token?.underlyingToken?.tokenId.toString()}
                    description='MOCK NFT'
                    jazzicon={true}
                  />
                ))}
              </>
            )}
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};
