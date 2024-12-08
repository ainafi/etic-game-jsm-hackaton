import ProtectedRoute from "@/middleware/ProtectedRoute";

export default function RootLayout({children,}:{children: React.ReactNode;}) {
    return (
      <ProtectedRoute>
        <main>
          {children}
        </main>

      </ProtectedRoute>
    );
  }