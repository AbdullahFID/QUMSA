import FAQ from "../../../components/FAQ";
import type { Metadata } from "next";

// Export metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "Frequently Asked Questions - QUMSA",
  description: "Find answers to the most commonly asked questions about our program",
};

export default function Page() {
  return <FAQ />;
}
