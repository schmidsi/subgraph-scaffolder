// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import generateScaffold from '@/utils/generateScaffold';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const result = generateScaffold({
    abi: req.body,
  });

  res.status(200).json(result);
}
