
import { CaseDetailContent } from "@/components/dashboard/case-detail-content";

// The default export remains a simple component that renders the client-side content.
// This structure satisfies the Next.js static export requirements while allowing dynamic
// client-side rendering of the actual content.
export default function CaseDetailPage() {
    return <CaseDetailContent />;
}
