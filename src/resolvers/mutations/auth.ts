import { generateToken } from "@/auth/sessions";
import { MutationResolvers } from "@/generated/graphql";
import { authorizeUser, createUser } from "@/services/user.service";

const auth: MutationResolvers = {
  signup: async (_parent, { input }, _ctx) => {
    const user = await createUser(input);
    const token = await generateToken(user.id);

    return { user, token };
  },
  login: async (_parent, { input }, _ctx) => {
    const user = await authorizeUser(input);
    const token = await generateToken(user.id);

    return { user, token };
  },
};

export default auth;
