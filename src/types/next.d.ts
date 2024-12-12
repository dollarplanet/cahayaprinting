declare type ServerSearchParamsType = Promise<{ [key: string]: string | undefined }>

declare type NextServerPage = (props: {
  params: Promise<{ [key: string]: string | undefined }>;
  searchParams: ServerSearchParamsType;
}) => Promise<React.ReactElement>