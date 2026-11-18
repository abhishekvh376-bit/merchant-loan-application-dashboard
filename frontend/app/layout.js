import "./globals.css";

export const metadata = {
  title: "Merchant Loans | Overview",
  description: "Merchant loan application management dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
