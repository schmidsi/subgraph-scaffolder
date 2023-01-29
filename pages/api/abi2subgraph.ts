// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import immutable from 'immutable';

import Protocol from '@graphprotocol/graph-cli/dist/protocols'
import Scaffold from '@graphprotocol/graph-cli/dist/scaffold'

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const protocol = new Protocol('ethereum');
  const ABI = protocol.getABI();
  const normalized = ABI.normalized(req.body);
  const abi = new ABI("Token", undefined, immutable.fromJS(normalized));

  const scaffold = new Scaffold({
    protocol,
    abi,
    indexEvents: true,
    contract: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
    network: 'mainnet',
    contractName: 'Token',
    startBlock: '12345',
  })

  const result = scaffold.generate();

  res.status(200).json(result);
}
