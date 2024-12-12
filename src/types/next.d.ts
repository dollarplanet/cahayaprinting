declare type NextServerPage = (props: {
  params: Promise<{ [key: string]: string | undefined }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => Promise<React.ReactElement>