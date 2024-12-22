"use client";

import { generatePriceAction } from "@/actions/generate-price-action";
import { Button, useDocumentInfo, useField, useForm } from "@payloadcms/ui"

const PriceGeneratorButton: React.FC = () => {
  const { id } = useDocumentInfo()
  const { submit } = useForm()
  const { formInitializing, formProcessing, value } = useField({
    path: "variant.priceVariation",
  })

  const onClick = async () => {
    await submit();
    const result = confirm("This action will reset all assigned prices, continue?");
    if (!result) return;
    generatePriceAction(Number(id));
  }

  return (
    <>
      {Boolean(id) && <Button disabled={formInitializing || formProcessing || !value || ((value as number[]).length === 0)} onClick={onClick}>
        Generate Price
      </Button>}
    </>
  )
}

export default PriceGeneratorButton;