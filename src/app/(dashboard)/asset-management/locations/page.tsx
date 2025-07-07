
import { getAssetLocationsData } from "@/lib/actions";
import { AssetLocationsClientPage } from "./locations-client";

export default async function AssetLocationsPage() {
    const data = await getAssetLocationsData();
    return <AssetLocationsClientPage data={data} />;
}
