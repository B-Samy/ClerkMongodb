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

        const email = email_addresses?.[0]?.email_address || "";

        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    avatar: image_url, 
                    email: email_addresses[0].email,
                    username: username,
                },
            },
            { new: true, upsert: true }
        );

        return user;


    } catch (error) {
        console.error("Error creating or updating user:", error);
        throw new Error(`DB Error: ${error.message}`);
    }
};

export const deleteUser = async (id) => {
    try {
        await connect();
        await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
