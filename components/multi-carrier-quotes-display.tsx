'use client';

// Removed unused imports
import { EnhancedPriceCard } from './enhanced-price-card';
import usePriceCardStore from '@/stores/usePriceCardStore';
import { useEffect } from 'react';


interface CarrierQuote {
  carrier: 'UPS' | 'DHL' | 'ARAMEX';
  pricePerBox?: number;
  totalPrice: number;
  available: boolean;
  region?: number | string;
  serviceType: string;
  actualWeight?: number;
  chargeableWeight?: number;
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
  language?: 'en' | 'tr';
}

export function MultiCarrierQuotesDisplay({
  country,
  quotes,
  quantity = 1,
  boxCalculations,
  dimensionalAnalysis,
  showDetailedAnalysis = false,
  language = 'en',
}: MultiCarrierQuotesDisplayProps) {
  const { setPriceCardData } = usePriceCardStore();
  
  // Calculate final quantity with proper fallback logic for mixed boxes
  const finalQuantity = quantity ?? dimensionalAnalysis?.totalBoxes ?? 1;
  
  // Save price card data to store when component mounts (chat'i etkilemez)
  useEffect(() => {
    try {
      if (quotes && quotes.length > 0) {
        // 🎯 DEBUG: Proper debugging information as requested
        console.log('=== PRICE CARD DEBUGGING INFO ===');
        
        // UPS Debug Info
        const upsQuote = quotes.find(q => q.carrier === 'UPS');
        if (upsQuote) {
          console.log('UPS:');
          console.log(`  country: ${country}`);
          console.log(`  boxes: ${finalQuantity}`);
          console.log(`  chargeableweight: ${upsQuote.chargeableWeight || 'Not specified'}`);
          console.log(`  region: ${upsQuote.region || 'Not found'}`);
          console.log(`  available: ${upsQuote.available}`);
          console.log(`  price: $${upsQuote.totalPrice}`);
        }
        
        // DHL Debug Info  
        const dhlQuote = quotes.find(q => q.carrier === 'DHL');
        if (dhlQuote) {
          console.log('DHL:');
          console.log(`  country: ${country}`);
          console.log(`  boxes: ${finalQuantity}`);
          console.log(`  chargeableweight: ${dhlQuote.chargeableWeight || 'Not specified'}`);
          console.log(`  region: ${dhlQuote.region || 'Not found'}`);
          console.log(`  available: ${dhlQuote.available}`);
          console.log(`  price: $${dhlQuote.totalPrice}`);
          if (!dhlQuote.available && (dhlQuote as any).message) {
            console.log(`  error: ${(dhlQuote as any).message}`);
          }
        }
        
        // ARAMEX Debug Info
        const aramexQuote = quotes.find(q => q.carrier === 'ARAMEX');
        if (aramexQuote) {
          console.log('ARAMEX:');
          console.log(`  country: ${country}`);
          console.log(`  boxes: ${finalQuantity}`);
          console.log(`  chargeableweight: ${aramexQuote.chargeableWeight || 'Not specified'}`);
          console.log(`  region: ${aramexQuote.region || 'Not found'}`);
          console.log(`  available: ${aramexQuote.available}`);
          console.log(`  price: $${aramexQuote.totalPrice}`);
          if (!aramexQuote.available && (aramexQuote as any).message) {
            console.log(`  error: ${(aramexQuote as any).message}`);
          }
        }
        
        console.log('================================');

        setPriceCardData({
          country,
          quotes,
          quantity: finalQuantity,
          totalWeight: dimensionalAnalysis?.chargeableWeightTotal,
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      // Hata olursa sadece log yaz, chat'i etkileme
      console.log('Price card store error (non-critical):', error);
    }
  }, [country, quotes, finalQuantity, dimensionalAnalysis?.chargeableWeightTotal, setPriceCardData]);
  
  // Use the enhanced price card component
  return (
    <div className="w-full space-y-6">
      <EnhancedPriceCard
        country={country}
        quotes={quotes}
        boxCalculations={boxCalculations}
        dimensionalAnalysis={dimensionalAnalysis}
        quantity={finalQuantity}
        totalWeight={undefined}
        showDetailedAnalysis={showDetailedAnalysis}
        language={language}
      />
    </div>
  );
}

export default MultiCarrierQuotesDisplay;