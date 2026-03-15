import "./globals.css";

export const metadata = {
  title: "Digiscience Techsol Private Limited",
  description: "AI systems architecture on cloud, cloud migration, DevOps, FinOps, observability, and cloud AIOps consulting."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
