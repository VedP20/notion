import Navbar from "./-components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-[#1F1F1F] min-h-screen">
      <Navbar />
      <main className="pt-32 h-full">{children}</main>
    </div>
  );
};

export default MarketingLayout;
