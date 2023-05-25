import type { WebhookEvent } from "@clerk/clerk-sdk-node" 
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const evt = req.body.evt as WebhookEvent; 
    switch (evt.type) {
        case 'user.created': // this is typed
            console.log('user created', evt.data.id)
    }
    res.end(evt.type);
};
 
export default handler;