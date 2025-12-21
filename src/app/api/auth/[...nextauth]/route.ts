import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/backend/db";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { IUser, User } from "@/backend/models/user.model";
import { Types } from "mongoose";

// Extend the default session user type to include _id and role
declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Username and password required");
        }

        await connectDB();

        const user = await User.findOne({ username: credentials.username });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        const typedUser = user as IUser;

        return {
          id: (typedUser._id as { toString: () => string }).toString(),
          username: typedUser.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id?: string; username?: string };

        token._id = u.id;
        token.username = u.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = new Types.ObjectId(token._id as string);
        session.user.username = token.username as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
