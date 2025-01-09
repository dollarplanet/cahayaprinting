declare type ServerSearchParamsType = Promise<{ [key: string]: string | undefined }>

declare type NextServerPage = (props: {
  params: Promise<{ [key: string]: string | undefined }>;
  searchParams: ServerSearchParamsType;
}) => Promise<React.ReactElement>

declare type LocalCart = {
  id: number;
  priceVariants: number[];
  freeVariants: number[];
  quantity: number;
  priceVariationsName: string;
  freeVariationsName: string;
  productName: string;
  price: number;
  image?: string | null;
}