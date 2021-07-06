import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';

function startServer({ typeDefs, resolvers }) {
  mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const pubsub = new PubSub();
  const showPlayground = process.env.PRODUCTION === 'true' ? false : true;
  const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub }, playground: showPlayground});
  server.listen().then(({ url }) => console.log(`Server started at ${url}`))
}

export default startServer;