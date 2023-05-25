import type { WebhookEvent } from "@clerk/clerk-sdk-node" 
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const evt = (req.body as { evt: WebhookEvent }).evt; 
    switch (evt.type) {
        case 'user.created': // this is typed
            console.log('user created', evt.data.id)
    }
    const data:any|{
        "data": {
          "birthday": "",
          "created_at": 1654012591514,
          "email_addresses": [
            {
              "email_address": "example@example.org",
              "id": "idn_29w83yL7CwVlJXylYLxcslromF1",
              "linked_to": [],
              "object": "email_address",
              "verification": {
                "status": "verified",
                "strategy": "ticket"
              }
            }
          ],
          "external_accounts": [],
          "external_id": "567772",
          "first_name": "Example",
          "gender": "",
          "id": "user_29w83sxmDNGwOuEthce5gg56FcC",
          "last_name": "Example",
          "last_sign_in_at": 1654012591514,
          "object": "user",
          "password_enabled": true,
          "phone_numbers": [],
          "primary_email_address_id": "idn_29w83yL7CwVlJXylYLxcslromF1",
          "primary_phone_number_id": null,
          "primary_web3_wallet_id": null,
          "private_metadata": {},
          "profile_image_url": "https://www.gravatar.com/avatar?d=mp",
          "public_metadata": {},
          "two_factor_enabled": false,
          "unsafe_metadata": {},
          "updated_at": 1654012591835,
          "username": null,
          "web3_wallets": []
        },
        "object": "event",
        "type": "user.created"
    } = evt; 
    
    await prisma.user.create({
        data: {
            id: data.id,
            email: data.object,
            createdAt: data.data.created_at,
            updatedAt: data.data.updated_at,
            isAdmin: false
        }
    })
    res.end(data.type);
};
 
export default handler;