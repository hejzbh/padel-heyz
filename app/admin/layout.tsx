import { Metadata } from "next";
import _admin_protect from "./_admin_protect";

export const metadata: Metadata = {
  robots: "noindex, nofollow", // seo disabled
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <_admin_protect>{children}</_admin_protect>;
}
