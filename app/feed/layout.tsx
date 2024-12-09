import Sidebar from "@/components/shared/Sidebar";
// import { fetchData } from "@/lib/fetchdata";
import ProtectedRoute from "@/middleware/ProtectedRoute";


export default function FeedLayout({children,}:{children: React.ReactNode;}) {
    return (
      <ProtectedRoute>
        <main className="bg-dark flex min-h-screen w-full flex-col lg:flex-row">
          <Sidebar/>
          <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
            <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular">
              {children}

            </div>
          </div>
        </main>

      </ProtectedRoute>
    );
  }