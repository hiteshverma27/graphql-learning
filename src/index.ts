import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const books = [
  {
    title: "The Awakening",
    authorId: 1,
  },
  {
    title: "City of Glass",
    authorId: 2,
  },
];

const authors = [
  {
    name: "Kate Chopin",
    id: 1,
  },
  {
    name: "Gordan Ramsey",
    id: 2,
  },
];

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Book {
    title: String
    author: Author
  }

  type Author {
  name: String
  id: ID
  books:[Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
  Book: {
    author: (parent) => authors.find((a) => a.id === parent.authorId),
  },
  Author: {
    books: (parent) => books.filter((b) => b.authorId === parent.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready att: ${url}`);