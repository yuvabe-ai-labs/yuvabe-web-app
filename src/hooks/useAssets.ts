import { assetService } from "@/services/assets.service";
import { useQuery } from "@tanstack/react-query";

export const useAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: assetService.fetchAssets,
    retry: 1,
  });
};
