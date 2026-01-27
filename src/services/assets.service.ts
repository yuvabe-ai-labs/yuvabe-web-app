import type { AssetDTO } from "@/types/assets.types";
import api from "../lib/axios-client";

export const assetService = {
  fetchAssets: async (): Promise<AssetDTO[]> => {
    const res = await api.get("/profile/assets");
    return res.data.data.assets;
  },
};
