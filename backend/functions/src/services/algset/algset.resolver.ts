import { Algset } from '../services';
import { generateRootResolvers } from '../../helpers/tier2/rootResolver'
import { typeDefs } from '../typeDefs';

const resolvers = {
  query: {},
  mutation: {},
  subscription: {}
};

generateRootResolvers(resolvers, Algset, typeDefs, {
  methods: ["get", "getMultiple", "getFirst", "delete", "update", "create"]
});

export default resolvers;