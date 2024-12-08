import { ID } from "appwrite"
import { account,avatars,appwriteConfig, databases } from "./appwriter/config"

interface INewUser {
    email: string;
    password: string;
}

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password
        );
        if (!newAccount) throw new Error('Account creation failed');

        const avatarUrl = avatars.getInitials(user.email);
        const newUser = await saveUserToDb({
            accountId: newAccount.$id,
            email: user.email,
            password: user.password,
            profil_Url: avatarUrl
        });

        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function saveUserToDb(user: {
    accountId: string;
    email: string;
    password: string;
    profil_Url: string;
}) {
    try {
        const databasesId = appwriteConfig.databasesId ?? '';
        const userCollectionIds = appwriteConfig.userCollectionId ?? '';
    const newUser = await databases.createDocument(
      databasesId,
      userCollectionIds,
      ID.unique(),
      user
    );
        
        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
}