import { ID, Query } from "appwrite";
import { account, avatars, appwriteConfig, databases } from "@/lib/appwriter/config";
import useAuthStore from "@/store/useAuth";

interface INewUser {
  email: string;
  password: string;
}

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.password);
    if (!newAccount) throw new Error('Account creation failed');

    const avatarUrl = avatars.getInitials(user.email);
    const newUser = await saveUserToDb({
      email: user.email,
      password: user.password,
      profil_Url: [avatarUrl],
    });

    return newUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 409) {
      console.error("A user with the same email already exists.");
    } else {
      console.error("Error creating user account:", error);
    }
    throw error;
  }
}

export async function saveUserToDb(user: { email: string; password: string; profil_Url: string[] }) {
  try {
    console.log("Saving user to database:", user); // Debug
    const databasesId = appwriteConfig.databasesId ?? '';
    const userCollectionIds = appwriteConfig.userCollectionId ?? '';
    const newUser = await databases.createDocument(databasesId, userCollectionIds, ID.unique(), user);

    console.log("User saved to database:", newUser); // Debug
    return newUser;
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw error;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {

    try {
       await account.getSession('current');
      await account.deleteSession('current');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("No active session found, proceeding to sign in");
    }
    await account.createEmailPasswordSession(user.email, user.password);
    const currentUser = await account.get();

    console.log("User signed in successfull// If there is no active session, we can safely ignore the errory:", currentUser); // Debug
    useAuthStore.getState().setUser(currentUser);
    return currentUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error signing in user:", error);
    throw error;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    useAuthStore.getState().clearUser();
    console.log("User logged out successfully"); // Debug
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  const databasesId = appwriteConfig.databasesId ?? '';
  const userCollectionIds = appwriteConfig.userCollectionId ?? '';
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('No current account found');

    const currentUser = await databases.listDocuments(
      databasesId,
      userCollectionIds,
      [Query.equal('email', currentAccount.email)]
    );

    useAuthStore.getState().setUser(currentUser.documents[0]);
    return currentUser.documents[0];
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
}