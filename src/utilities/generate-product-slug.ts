type Props = {
  name?: string;
  sku?: string;
}

export const generateProductSlug = (props: Props) => {
  return encodeURI(`${props.name ?? ""}-${props.sku ?? ""}`.trim().toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, "-")).replace(/-+/g, "-");
}