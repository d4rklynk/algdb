import { AlgTagLink } from '../../services';
import { generateRootResolvers } from '../../../helpers/tier2/rootResolver'
import { typeDefs } from '../../typeDefs';

const resolvers = {
  query: {},
  mutation: {},
  subscription: {}
};

generateRootResolvers(resolvers, AlgTagLink, typeDefs, {
  methods: ["get", "getMultiple", "getFirst", "delete", "create"]
});

export default resolvers;