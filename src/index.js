import { GraphQLServer } from 'graphql-yoga';

const users = [
  { id: '1', name: 'todd', email: 'todd@example.com' },
  { id: '2', name: 'sam', email: 'son@sam' },
  { id: '3', name: 'mike', email: 'shit@c.com' }
];

// type definitions {schema}
const typeDefs = `
    type Query {
       me: User!
       post: Post!
       users(query: String): [User!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }

`;

// resolvers
const resolvers = {
  Query: {
    me: () => ({
      id: '123098',
      name: 'mike',
      email: 'mike@example.com',
      age: 33
    }),
    post: () => ({
      id: '231232',
      title: 'cool',
      body: `stuff
            to
            do`,
      published: true
    }),
    users: (_, { query }, ctx, info) => {
      if (query) return users.filter(user => user.name.includes(query));
      return users;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
