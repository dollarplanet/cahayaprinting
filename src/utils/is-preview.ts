import { AuthStrategyFunctionArgs } from "payload";
import { currentSession } from "./current-session";

type Props = {
  auth: AuthStrategyFunctionArgs,
  searchParams: ServerSearchParamsType
}

export const isPreview = async (props: Props) => {
  const session = await currentSession(props.auth);

  const isPreview = (session.user !== null) && ((await props.searchParams).preview === "true");

  return isPreview;
}