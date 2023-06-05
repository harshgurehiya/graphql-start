const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");

const app = express();

let message = "This is a message";

const schema = buildSchema(`

   type Post{
    userId: Int
    id: Int
    title: String
    body: String
   }

   type User{
    name: String
    age: Int
    college: String
   }

   type Query {                         
    hello: String
    welcomeMessage(name: String, dayOfWeek: String!): String
    getUser: User
    getUsers: [User]
    getPostsFromExternalAPI: [Post]
    message: String
   }

   input UserInput{
    name: String!
    age: Int!
    college: String!
   }
   
   type Mutation{
    setMessage(newMessage: String): String
    createUser(user: UserInput): User
   }
`);

const root = {
  hello: (args) => {
    return "Hello World!";
  },
  welcomeMessage: (args) => {
    //console.log(args);
    return `Hey ${args.name}, how's life😄, today is ${args.dayOfWeek}`;
  },
  getUser: () => {
    const user = {
      name: "Harsh",
      age: 26,
      college: "IMS",
    };
    return user;
  },
  getUsers: () => {
    const users = [
      {
        name: "Arkansh",
        age: 26,
        college: "IMT",
      },
      {
        name: "Archit",
        age: 25,
        college: "IMS",
      },
    ];
    return users;
  },
  getPostsFromExternalAPI: async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return result.data;

    // return axios
    //   .get("https://jsonplaceholder.typicode.com/posts")
    //   .then((result) => result.data);
  },
  setMessage: ({ newMessage }) => {
    message = newMessage;
    return message;
  },
  message: () => message,

  createUser: (args) => {
    console.log(args);
    // create a new user inside DB or external API
    return args.user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => console.log(`🚀 Server running on port 4000....`));
