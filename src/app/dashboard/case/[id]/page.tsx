
import { CaseDetailContent } from "@/components/dashboard/case-detail-content";

// This is required for static export with dynamic routes.
// We return an empty array because we don't want to pre-render any specific case pages.
// The page will be rendered on the client side.
export function generateStaticParams() {
  return [];
}

// The default export remains a simple component that renders the client-side content.
// This structure satisfies the Next.js static export requirements.
export default function CaseDetailPage() {
    return <CaseDetailContent />;
}
