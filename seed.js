import 'dotenv/config';

import { db } from './dbConnect';

const users = [
    {
        username: 'nheyek',
        email: 'nick@heyek.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];