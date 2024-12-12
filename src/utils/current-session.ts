import { AuthStrategyFunctionArgs, AuthStrategyResult } from "payload";

type FunctionType = (props: AuthStrategyFunctionArgs) => Promise<AuthStrategyResult>

export const currentSession: FunctionType = async (props) => {
  const strategies = props.payload.authStrategies;

  if (strategies.length === 0) {
    return {
      user: null,
    };
  }

  return await strategies[0].authenticate(props);
}