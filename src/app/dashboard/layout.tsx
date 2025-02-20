export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex w-full bg-gray-500">
        <h3>Header</h3>
      </div>
      {children}
    </div>
  );
}
