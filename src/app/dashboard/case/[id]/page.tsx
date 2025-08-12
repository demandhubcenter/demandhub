
import { CaseDetailContent } from "@/components/dashboard/case-detail-content";

// This file is a simple Server Component that renders the client component.
// It includes an empty generateStaticParams function to satisfy the requirements
// of `output: 'export'` in next.config.ts. This tells Next.js not to pre-render
// any dynamic instances of this page at build time.
export async function generateStaticParams() {
  // We return an empty array because the case IDs are not known at build time.
  // The pages will be rendered on the client-side.
  return [];
}

export default function CaseDetailPage() {
    return <CaseDetailContent />;
}
