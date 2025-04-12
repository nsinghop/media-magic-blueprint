
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import PlatformConnections from "@/components/platforms/PlatformConnections";

const Platforms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <PlatformConnections />
        </main>
      </div>
    </div>
  );
};

export default Platforms;
