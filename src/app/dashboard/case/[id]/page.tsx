import CaseDetailPageClient from "@/components/dashboard/case-detail-page";

// This page remains a Server Component.
// Its only job is to render the Client Component and pass params to it.

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return <CaseDetailPageClient params={params} />;
}

// This function is REQUIRED for static exports with dynamic routes.
// It tells Next.js not to pre-render any specific pages at build time.
export async function generateStaticParams() {
  return [];
}
