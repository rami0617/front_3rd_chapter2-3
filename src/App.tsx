import { BrowserRouter as Router } from "react-router-dom";
import Header from "./widgets/common/ui/Header.tsx";
import Footer from "./widgets/common/ui/Footer.tsx";
import PostsManagerPage from "./pages/PostsManagerPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
