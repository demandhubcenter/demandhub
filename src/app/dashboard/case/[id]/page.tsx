
import { CaseDetailContent } from "@/components/dashboard/case-detail-content";

// This function is required for static exports with dynamic routes.
// It tells Next.js that there are no pages to pre-render at build time.
// The pages will be rendered on the client side.
export async function generateStaticParams() {
  return [];
}

// The default export remains a simple component that renders the client-side content.
// This structure satisfies the Next.js static export requirements while allowing dynamic
// client-side rendering of the actual content.
export default function CaseDetailPage() {
    return <CaseDetailContent />;
}
