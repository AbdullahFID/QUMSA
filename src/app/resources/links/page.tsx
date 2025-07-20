import ResourcePanel from "../../../components/ResourcePanel";
import type { Metadata } from "next";

// Export metadata for SEO and social platforms
export const metadata: Metadata = {
  title: "QUMSA Resource Hub",
  description: "Access centralized academic, spiritual, and social resources curated by QUMSA for the Queen’s Muslim community.",
  keywords: ["QUMSA", "Queen's University", "Muslim Students", "Resources", "Islamic Events", "Support", "Campus Life"],
};

export default function Page() {
  return <ResourcePanel />;
}
