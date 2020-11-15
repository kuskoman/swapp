import { startTestServer } from "../../helpers/apolloInstance";
import { toPromise } from "apollo-link";
import gql from "graphql-tag";
import { UserID } from "@/types";
import { getUserIdFromToken } from "@/auth/sessions";

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
      }
    }
  }
`;

describe("Signup mutation", () => {
  let stop: Function, graphql: any;

  beforeEach(async () => {
    const testServer = await startTestServer();
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach(() => stop);

  it("when data is valid returns token and user data", async () => {
    const variables = { email: "test@example.com", password: "123142354345" };

    const response: UserSignupResponse = await toPromise(
      graphql({
        query: SIGNUP_MUTATION,
        variables,
      })
    );

    const signupData = response.data?.signup;
    const userData = signupData?.user;
    const receivedEmail = userData?.email;
    const expectedEmail = variables.email;
    const { errors } = response;

    expect(errors).toBe(undefined);

    expect(receivedEmail).toBe(expectedEmail);

    const token = signupData?.token;

    expect(token).not.toBe(undefined);

    const userIdFromToken = await getUserIdFromToken(token as string);
    const receivedId = userData?.id;
    const receivedIdAsNumber = Number(receivedId);

    expect(userIdFromToken).toBe(receivedIdAsNumber);
  });

  it("when data is invalid throws an error", async () => {
    const variables = { email: "@invalid.com", password: "123142354345" };

    const response: UserSignupResponse = await toPromise(
      graphql({
        query: SIGNUP_MUTATION,
        variables,
      })
    );

    const { errors, data } = response;

    expect(data).toBe(null);
    expect(errors).not.toBe(undefined);

    const errorMessage = errors?.slice(0)[0].message;

    expect(errorMessage).toBe("The input is invalid");
  });
});

interface UserSignupResponse {
  data: {
    signup: {
      token: string;
      user: {
        id: UserID;
        email: string;
      };
    };
  } | null;
  errors?: Array<{
    message: string;
  }>;
}
