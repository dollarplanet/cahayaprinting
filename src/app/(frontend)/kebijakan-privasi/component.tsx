import { PrivacyPolicy } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

type Props = {
  data: PrivacyPolicy
}

export const PrivacyPolicyComponent = (props: Props) => {
  return (
    <div className="p-8">
      <RichText className="prose prose-sm mb-4" data={props.data.content} />
    </div>
  );
}