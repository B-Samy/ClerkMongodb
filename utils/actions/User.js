import User from "../../models/User.model";
import { connect } from "../../utils/mongoose";

export const createOrUpdateUser = async (
    id,
    first_name,
    last_name,
    email_addresses,
    username,
    image_url
) => {
    try {
        await connect();

        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    avtar: image_url,
                    email: email_addresses[0].email_address,
                    username: username,
                },
            },
            { new: true, upsert: true }
        );

        return user;
    } catch (error) {
        console.log('Error creating or updating user', error);
        throw new Error('Error creating or updating user');
    }
};



export const deleteUser = async (id) =>{
    try {
        await connect()
        await User.findOneAndDelete({clerkId: id})
    } catch (error) {
        console.log('Error deleting user', error)
    }
}