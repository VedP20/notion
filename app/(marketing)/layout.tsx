import Footer from "./-components/footer";
import Navbar from "./-components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <main className="mt-32 h-full">{children}</main>
    </div>
  );
};

export default MarketingLayout;
