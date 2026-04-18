// ─── Product Card Gradients ───────────────────────────────────────────────────

export const productCardGradients = [
  "linear-gradient(135deg, #FF7E5F 0%, #FD3A69 100%)",
  "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
  "linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%)",
];

export function getProductGradient(index: number): string {
  return productCardGradients[index % productCardGradients.length];
}
