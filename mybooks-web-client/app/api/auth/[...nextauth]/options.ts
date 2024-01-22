import GoogleProvider from "next-auth/providers/google";

export const options = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  // // Make call to API to update our MySQL DB.
  // callbacks: {
  //   async session({ session }) {
  //     return session
  //   },
  //   async signIn({ profile }) {
  //     try {
  //       console.log(profile);
  //       return true;
  //     } catch (err) {
  //       console.log(err);
  //       return false;
  //     }
  //     // send api request to check DB / make new user.

  //   }
  // }
}
