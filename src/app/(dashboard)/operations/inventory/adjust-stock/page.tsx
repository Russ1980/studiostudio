
import { getInventoryData } from '@/lib/actions';
import { AdjustStockForm } from './adjust-stock-form';

export default async function AdjustStockPage() {
  const inventoryData = await getInventoryData();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Stock Adjustment</h1>
        <p className="text-muted-foreground">
          Manually adjust inventory levels for cycle counts, damages, or other reasons.
        </p>
      </div>
      <AdjustStockForm inventory={inventoryData.inventory} />
    </div>
  );
}
