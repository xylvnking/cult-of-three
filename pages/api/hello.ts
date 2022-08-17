// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  photoUrl: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ photoUrl: '/Images/brute.png' })
}


// export default function handler(req:any, res:any) {
//   console.log(res)
//   const { pid } = req.query
//   res.end(
//     `aero: ${
//         res.status(200).json({ 
//     imageUrl: '/Images/brute.png' })
//     }`
//     )
// }