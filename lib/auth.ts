import { ID } from "appwrite";
import { account, avatars, appwriteConfig, databases } from "./appwriter/config";

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
      email: user.email,
      password: user.password,
      profil_Url: [avatarUrl],  // Changed to an array
    });

    return newUser
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 409) {
      console.error("A user with the same email already exists.");
    } else {
      console.error(error);
    }
    throw error;
  }
}

export async function saveUserToDb(user: {
  email: string;
  password: string;
  profil_Url: string[];
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

    return newUser
  } catch (error) {
    console.error(error);
    throw error;
  }
}
