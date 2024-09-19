import { Request, Response } from 'express'; // Import Request and Response types
import { getuserByEmail, createUser } from '../mongodb/models/user.model';
import { generateAuthToken } from '../helpers/index';


export const register = async (req: Request, res: Response) => { // Add explicit types for req and res
    try {
        console.log(req.body);
        const { email, name } = req.body;

        if (!email || !name) {
            return res.sendStatus(400);
        }

        const userExists = await getuserByEmail(email);

        if (userExists) {
            return res.status(409).send('Email already exists');
        }


        const newUser = await createUser({
            email: email,
            name: name,
        });

        const token = await generateAuthToken(newUser._id.toString()); 
        console.log(token);
        return res.status(200).json({ newUser, token }).end();

    } catch (e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};