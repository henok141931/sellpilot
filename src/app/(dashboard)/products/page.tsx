import { getProduct } from "@/app/actions/products";
import { ProductForm } from "@/components/products/ProductForm";

export default async function ProductsPage() {
  const product = await getProduct();

  return (
    <ProductForm initialProduct={product} />
  );
}
