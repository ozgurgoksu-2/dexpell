'use client';

import { MultiCarrierQuotesDisplay } from '@/components/multi-carrier-quotes-display';

// Latest data from your terminal output (Kuwait example)
const exactApiData = {
  country: "Kuwait",
  quotes: [
    {
      carrier: "UPS" as const,
      available: true,
      pricePerBox: 27.21,
      totalPrice: 81.64,
      serviceType: "UPS Express",
      region: 4
    },
    {
      carrier: "DHL" as const,
      available: true,
      pricePerBox: 71.65,
      totalPrice: 214.95,
      serviceType: "DHL Express",
      region: 5
    },
    {
      carrier: "ARAMEX" as const,
      available: true,
      pricePerBox: 30.54,
      totalPrice: 91.61,
      serviceType: "ARAMEX Express",
      region: "KUWAIT"
    }
  ],
  quantity: 3,
  chargeableWeight: 15,
  chargeableWeightPerBox: 5,
  actualWeight: 5,
  volumetricWeight: 1.6,
  length: 20,
  width: 20,
  height: 20,
  content: "general cargo"
};

export default function TestLayoutPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Final Layout Test - Exact API Data Structure
        </h1>
        
        <p className="text-muted-foreground text-center mb-8">
          This shows the exact layout with the data from your cargo_multi_pricing API response:
          <br />
          <code className="bg-muted px-2 py-1 rounded text-sm">
            3 boxes, 5kg each, 20×20×20cm to Kuwait
          </code>
        </p>

        <MultiCarrierQuotesDisplay {...exactApiData} />
        
        <div className="mt-12 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Layout Structure:</h3>
          <ol className="text-sm space-y-1 text-muted-foreground">
            <li>1. <strong>Shipment Details</strong> prominently at top</li>
            <li>2. Shows: Contents → Quantity → Chargeable Weight → Dimensions</li>
            <li>3. <strong>NEW:</strong> Total Actual Weight → Total Volumetric Weight → Calculating Weight</li>
            <li>4. Three carrier cards horizontally: UPS (Best Price) → ARAMEX → DHL</li>
            <li>5. All carriers available for Kuwait destination with ARAMEX pricing</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md">
            <h4 className="font-medium mb-2">Weight Calculations for 3 boxes:</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Total Actual Weight:</strong> 5kg × 3 = 15kg</li>
              <li>• <strong>Total Volumetric Weight:</strong> 1.6kg × 3 = 4.8kg</li>
              <li>• <strong>Calculating Weight:</strong> 15kg (higher of actual vs volumetric)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
