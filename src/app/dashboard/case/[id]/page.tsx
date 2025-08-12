
import { CaseDetailContent } from "@/components/dashboard/case-detail-content";

// This function is required for dynamic routes with `output: 'export'`.
// It tells Next.js not to pre-render any pages at build time.
// The pages will be generated on the client-side.
export async function generateStaticParams() {
    return [];
}

// This file is now a simple Server Component that renders the client component.
export default function CaseDetailPage() {
    return <CaseDetailContent />;
}
