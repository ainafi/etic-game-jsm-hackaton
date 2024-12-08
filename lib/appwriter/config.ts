import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    url: process.env.NEXT_PUBLIC_APPWRITE_URL,
    databasesId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    commandeId: process.env.NEXT_PUBLIC_APPWRITE_COMMANDE_COLLECTION_ID,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID
};

// Ensure all required environment variables are defined
if (!appwriteConfig.projectId || !appwriteConfig.url || !appwriteConfig.databasesId || !appwriteConfig.userCollectionId) {
    throw new Error('Missing Appwrite configuration values');
}

const client = new Client();
client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
