import { BasePayload } from "payload";

type Props = {
  payload: BasePayload
}

export type Seed = (props: Props) => Promise<void>;