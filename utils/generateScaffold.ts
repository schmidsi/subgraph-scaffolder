import immutable from 'immutable';

import Protocol from '@graphprotocol/graph-cli/dist/protocols';
import Scaffold from '@graphprotocol/graph-cli/dist/scaffold';

const generateScaffold = ({
  abi,
  protocol = 'ethereum',
  contractName = 'Token',
  network = 'mainnet',
  contractAddress = '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
  startBlock = 12345,
}: {
  abi: any;
  protocol?: string;
  contractName?: string;
  contractAddress?: string;
  network?: string;
  startBlock?: number;
}): any => {
  const protocolInstance = new Protocol(protocol);
  const ABI = protocolInstance.getABI();
  const normalized = ABI.normalized(abi);
  const abiInstance = new ABI(
    contractName,
    undefined,
    immutable.fromJS(normalized),
  );

  const scaffold = new Scaffold({
    protocol: protocolInstance,
    abi: abiInstance,
    indexEvents: true,
    contract: contractAddress,
    network,
    contractName,
    startBlock: startBlock.toString(),
  });

  return scaffold.generate();
};

export default generateScaffold;
