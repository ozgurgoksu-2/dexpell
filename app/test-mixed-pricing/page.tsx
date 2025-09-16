'use client';

import { useState, useEffect } from 'react';
import { EnhancedPriceCard } from '@/components/enhanced-price-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TestTube } from 'lucide-react';

interface TestResult {
  allowed: boolean;
  success: boolean;
  scenario: string;
  data: {
    country: string;
    quotes: any[];
    mixedBoxCalculation?: any;
    boxCalculations?: any[];
    dimensionalAnalysis?: any;
    summary?: any;
    content: string;
  };
  testData?: any;
}

export default function TestMixedPricingPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/test_mixed_boxes');
        const data = await response.json();
        
        if (data.error) {
          setError(data.message);
        } else {
          setResult(data);
        }
      } catch (err) {
        setError('Failed to fetch test data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Error: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <TestTube className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold">Multi-Carrier Mixed Boxes Test</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Testing 3 different sized boxes to Kuwait with UPS, DHL, and ARAMEX pricing
        </p>
      </div>

      {/* Test Case Details */}
      {result.testData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Test Case: {result.testData.description}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {result.testData.boxes.map((box: any, index: number) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{box.description}</h4>
                  <p className="text-sm text-gray-600">Expected volumetric: {box.expectedVolumetric}</p>
                  <p className="text-sm text-gray-600">Expected chargeable: {box.expectedChargeable}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-gray-500">Expected Total Actual</div>
                <div className="font-semibold">{result.testData.expectedTotals.totalActualWeight}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Expected Total Volumetric</div>
                <div className="font-semibold">{result.testData.expectedTotals.totalVolumetricWeight}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Expected Total Chargeable</div>
                <div className="font-semibold text-blue-600">{result.testData.expectedTotals.totalChargeableWeight}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Expected Scenario</div>
                <div className="font-semibold text-green-600">{result.testData.expectedTotals.scenario.replace('_', ' ')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result.success && result.data && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Pricing Results</h2>
            <p className="text-gray-600">
              Scenario: <span className="font-medium capitalize">{result.scenario.replace('_', ' ')}</span>
            </p>
            <p className="text-gray-600">
              Available Carriers: {result.data.quotes.filter((q: any) => q.available).length} of {result.data.quotes.length}
            </p>
          </div>

          {/* Enhanced Price Card - should show all 3 carriers */}
          <EnhancedPriceCard
            country={result.data.country}
            quotes={result.data.quotes}
            boxCalculations={result.data.boxCalculations}
            dimensionalAnalysis={result.data.dimensionalAnalysis}
            quantity={result.data.boxCalculations?.length || 3}
            totalWeight={result.data.summary?.totalActualWeight}
            showDetailedAnalysis={true}
            language="en"
          />

          {/* Raw Data Debug (can be hidden in production) */}
          <Card className="border-gray-200 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-sm">Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Available Quotes:</h4>
                  <div className="space-y-2">
                    {result.data.quotes.map((quote: any, index: number) => (
                      <div key={index} className="text-sm p-2 border rounded">
                        <strong>{quote.carrier}</strong>: 
                        {quote.available ? (
                          <span className="text-green-600 ml-2">
                            ${quote.totalPrice.toFixed(2)} USD ({quote.serviceType})
                          </span>
                        ) : (
                          <span className="text-red-600 ml-2">
                            Not available ({quote.message || 'Unknown reason'})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {result.data.dimensionalAnalysis && (
                  <div>
                    <h4 className="font-medium mb-2">Dimensional Analysis:</h4>
                    <div className="text-sm">
                      <p>Scenario: {result.data.dimensionalAnalysis.scenario}</p>
                      <p>Total Boxes: {result.data.dimensionalAnalysis.totalBoxes}</p>
                      <p>Actual Weight Total: {result.data.dimensionalAnalysis.actualWeightTotal}kg</p>
                      <p>Volumetric Weight Total: {result.data.dimensionalAnalysis.volumetricWeightTotal}kg</p>
                      <p>Chargeable Weight Total: {result.data.dimensionalAnalysis.chargeableWeightTotal}kg</p>
                      <p>Rounded Weight Total: {result.data.dimensionalAnalysis.roundedWeightTotal}kg</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
