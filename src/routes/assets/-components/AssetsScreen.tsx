import MobileLayout from "@/components/layout/MobileLayout";
import { useAssets } from "@/hooks/useAssets";
import {
  HeadphoneIcon,
  KeyboardIcon,
  Laptop,
  LaptopStand,
  MonitoIcon,
  MouseIcon,
} from "@/lib/utils/custom-icons";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";
import { type JSX } from "react";

const ASSET_COMPONENTS: Record<string, JSX.Element> = {
  laptop: <Laptop className="text-[#333]" />,
  mouse: <MouseIcon className="text-[#333]" />,
  keyboard: <KeyboardIcon className="text-[#333]" />,
  monitor: <MonitoIcon className="text-[#333]" />,
  headphone: <HeadphoneIcon className="text-[#333]" />,
  laptopstand: <LaptopStand className="text-[#333]" />,
};

export default function AssetsScreen() {
  const navigate = useNavigate();

  const { data: assets, isLoading, isError, refetch } = useAssets();

  return (
    <MobileLayout>
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>

        <div className="flex-1 flex justify-center -ml-9">
          <h1 className="text-[18px] font-semibold text-black font-gilroy">
            My Assets
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 mt-4 pb-10 min-h-125">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <Loader2 className="animate-spin text-primary mb-2" size={32} />
            <p className="text-gray-500 font-gilroy">Loading assets...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-[#777] font-medium text-[16px] mb-4 font-gilroy">
              Check your internet connection
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold"
            >
              Retry
            </button>
          </div>
        ) : !assets || assets.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-[#777] font-medium text-[16px] font-gilroy">
              No assets assigned
            </p>
          </div>
        ) : (
          /* ASSET LIST */
          <div className="space-y-4.5">
            {assets.map((item) => {
              // Get Icon or Default
              const iconComponent = ASSET_COMPONENTS[
                item.type.toLowerCase().replace(/\s/g, "")
              ] || <Laptop className="text-[#333]" />;

              return (
                <div
                  key={item.id}
                  className="w-[95%] mx-auto bg-white py-5 px-4.5 rounded-[18px] flex flex-row items-center border border-[#FFCA2D] shadow-sm transition-transform active:scale-[0.98]"
                  style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }} // Custom IOS-like shadow
                >
                  {/* Icon Wrapper */}
                  <div className="w-12.5 h-12.5 p-2 ml-3 flex justify-center items-center mr-4.5">
                    <div>{iconComponent}</div>
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 ml-5">
                    <h2 className="text-[18px] font-bold text-[#222] font-gilroy">
                      {item.asset_id}
                    </h2>
                    <p className="text-[14px] text-[#666] mt-1 font-gilroy capitalize">
                      {item.type}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="bg-primary px-5.5 py-1.5 rounded-[28px]">
                    <span className="text-white text-[13px] font-semibold font-gilroy capitalize">
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
