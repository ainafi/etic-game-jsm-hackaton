import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import  db  from "@/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
export const auth = betterAuth({
    emailAndPassword: {  
        enabled: true
    },
     socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID! as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string, 
        }, 
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema:schema
    }),

    baseURL: process.env.BETTER_AUTH_URL!,
    plugins: [nextCookies()]
});

