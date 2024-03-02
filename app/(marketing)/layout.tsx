import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="flex-1 pt-32">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
