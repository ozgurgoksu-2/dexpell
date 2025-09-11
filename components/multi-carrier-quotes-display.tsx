'use client';

// Removed unused imports
import { EnhancedPriceCard } from './enhanced-price-card';


interface CarrierQuote {
  carrier: 'UPS' | 'DHL' | 'ARAMEX';
  pricePerBox?: number;
  totalPrice: number;
  available: boolean;
  region?: number | string;
  serviceType: string;
}

interface BoxCalculationResult {
  boxNumber: number;
  actualWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
  quantity: number;
  totalChargeableWeight: number;
  dimensions: string;
  calculationMethod: 'actual' | 'volumetric';
  isDimensionalWeight: boolean;
  weightDifference: number;
}

interface DimensionalAnalysisResult {
  scenario: 'identical' | 'mixed_weights' | 'mixed_dimensions' | 'completely_mixed';
  totalBoxes: number;
  actualWeightTotal: number;
  volumetricWeightTotal: number;
  chargeableWeightTotal: number;
  roundedWeightTotal: number;
  dimensionalAdvantage: number;
  recommendations: string[];
}

interface MultiCarrierQuotesDisplayProps {
  country: string;
  quotes: CarrierQuote[];
  quantity?: number;
  boxCalculations?: BoxCalculationResult[];
  dimensionalAnalysis?: DimensionalAnalysisResult;
  showDetailedAnalysis?: boolean;
}

export function MultiCarrierQuotesDisplay({
  country,
  quotes,
  quantity = 1,
  boxCalculations,
  dimensionalAnalysis,
  showDetailedAnalysis = false,
}: MultiCarrierQuotesDisplayProps) {
  
  // Use the enhanced price card component
  return (
    <div className="w-full space-y-6">
      <EnhancedPriceCard
        country={country}
        quotes={quotes}
        boxCalculations={boxCalculations}
        dimensionalAnalysis={dimensionalAnalysis}
        quantity={quantity}
        totalWeight={undefined}
        showDetailedAnalysis={showDetailedAnalysis}
      />
    </div>
  );
}

export default MultiCarrierQuotesDisplay;