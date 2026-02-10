import { useAssets } from "@/hooks/useAssets";
import { getAssetIcon } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { AssetsSkeleton } from "./AssetSkeleton";

export default function AssetsScreen() {
  const navigate = useNavigate();

  const { data: assets, isLoading, isError, refetch } = useAssets();

  return (
    <>
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-50 shrink-0">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>

        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-semibold text-black font-gilroy">
            My Assets
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-5 pb-10">
        {isLoading ? (
          <AssetsSkeleton />
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
              const IconComponent = getAssetIcon(item.type);

              return (
                <div
                  key={item.id}
                  className="w-[95%] mx-auto bg-white py-5 px-4.5 rounded-[18px] flex flex-row items-center border border-[#FFCA2D] shadow-sm transition-transform active:scale-[0.98]"
                >
                  {/* Icon Wrapper */}
                  <div className="shrink-0 w-12 h-12 flex justify-center items-center ml-1">
                    {" "}
                    <IconComponent className="w-30 h-30 " />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 ml-5 min-w-0">
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
    </>
  );
}
