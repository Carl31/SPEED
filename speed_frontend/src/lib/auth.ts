import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define a User type
type User = {
  id: string;
  username: string;
  password: string;
  // Add any other required properties here
};

function authenticateUser(
  credentials: { username: string; password: string },
  users: User[]
): User | null {
  for (const user of users) {
    if (
      credentials.username === user.username &&
      credentials.password === user.password
    ) {
      return user; // User found, return the matching user
    }
  }
  return null; // No matching user found
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens for sessions.
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const users: User[] = [];
        try {
          const response = await fetch("http://localhost:4000/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json()) // Parse the JSON response
            .then((dataObject) => {
              // Extract values from the object and convert them into an array
              const dataArray = Object.values(dataObject);

              for (const user of dataArray) {
                users.push(user as User);
              }
            })
            .catch((error) => {
              console.error("Error fetching or parsing data:", error);
            });

          if (!credentials) {
            throw new Error();
          }
          const userToCheck: User = {
            id: "unkown",
            username: credentials.username,
            password: credentials.password,
          };

          const authenticatedUser = authenticateUser(userToCheck, users);

          if (authenticatedUser) {
            console.log("User authenticated:", authenticatedUser.username);
            return authenticatedUser;
          } else {
            console.log(
              "Authentication failed. User not found or invalid credentials."
            );
            return null;
          }
        } catch (error) {
          // Handle any errors that occurred during the fetch
          console.error("Fetch error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // enhancing the user session and token objects with additional properties...
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
          username: token.username,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          username: u.username,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
