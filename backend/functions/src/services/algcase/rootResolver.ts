import { Algcase } from "../services";
import { generateRootResolvers } from "../../helpers/tier2/rootResolver";

export default generateRootResolvers(Algcase, {
  methods: ["get", "getMultiple", "delete", "create", "update"],
});
