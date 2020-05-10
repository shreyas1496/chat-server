import { Resolver, Query } from "type-graphql";

@Resolver()
export class ChatResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello World!";
  }
}
