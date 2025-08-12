
import { CaseDetailContent } from "@/components/dashboard/case-detail-content";

// This file is now a simple Server Component that renders the client component.
// It does not need generateStaticParams because the links that point to this page
// are now handled by client-side routing, so the build crawler won't see them.
export default function CaseDetailPage() {
    return <CaseDetailContent />;
}
