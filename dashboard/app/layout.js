import "./globals.css";

export const metadata = {
  title: "My Dashboard",
  description: "Personal project & task management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
