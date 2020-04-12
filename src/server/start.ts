import AppServer from "./server";
import dotenv from "dotenv";
dotenv.config();

if (process.argv[2] != "test") {
  const PORT = process.env.PORT || 3001;
  AppServer.listen({ port: PORT }, (): void =>
    console.log(
      `\n🚀      GraphQL is now running on http://localhost:${PORT}/graphql`
    )
  );
}
