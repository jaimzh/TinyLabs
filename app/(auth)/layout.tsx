// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-green-50 50 flex items-center justify-center">
      {children}
    </div>
  );
}
