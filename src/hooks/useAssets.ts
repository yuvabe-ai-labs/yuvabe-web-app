import { assetService } from "@/services/assets.service";
import { useQuery } from "@tanstack/react-query";

export const useAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: assetService.fetchAssets,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
