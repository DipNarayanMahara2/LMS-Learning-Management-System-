declare module "next-auth" {
  interface Session {
    user: {
      role: String;
      id: String;
      email: String;
      name: String;
      image: String;
    };
  }
}

export default "next-app"
