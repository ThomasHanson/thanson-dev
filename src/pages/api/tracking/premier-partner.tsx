import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  user: string;
  event: string;
  startTime: Date;
}

let users: User[] = []; // Array to store user information

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user, event } = req.body as { user: string; event: string };
    const currentDate = new Date();

    // Store user information
    users.push({
      user,
      event,
      startTime: currentDate,
    });

    // Send a response back to the client
    res.status(200).json({ message: 'API call received successfully' });
  } else {
    res.status(405).end(); // Method Not Allowed for other request methods
  }
}
