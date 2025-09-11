'use client';

import { useState, useEffect } from 'react';
import { MultiCarrierQuotesDisplay } from '@/components/multi-carrier-quotes-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TestTube } from 'lucide-react';

export default function TestSpainMixedPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/functions/cargo_mixed_pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: 'general cargo',
            country: 'Spain',
            boxes: [
              { weight: 10, length: 20, width: 30, height: 60 },
              { weight: 15, length: 60, width: 50, height: 50 }
            ]
          })
        });

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (!result || !result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Error: {result?.message || 'Failed to load data'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <TestTube className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold">Spain Mixed Boxes - Three Price Cards Test</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Testing the exact Spain example from the chat: 2 mixed boxes with different dimensions
        </p>
      </div>

      {/* Test Case Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Chat Example: 2 Mixed Boxes to Spain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Box 1: 10kg, 20×30×60cm</h4>
              <p className="text-sm text-gray-600">Expected volumetric: 7.2kg</p>
              <p className="text-sm text-gray-600">Expected chargeable: 10kg (actual)</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Box 2: 15kg, 60×50×50cm</h4>
              <p className="text-sm text-gray-600">Expected volumetric: 30kg</p>
              <p className="text-sm text-gray-600">Expected chargeable: 30kg (volumetric)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Actual</div>
              <div className="font-semibold">25kg</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Volumetric</div>
              <div className="font-semibold">37.2kg</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Chargeable</div>
              <div className="font-semibold text-blue-600">40kg</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Expected Winner</div>
              <div className="font-semibold text-green-600">UPS ($152.34)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Carrier Quotes Display - This should show all 3 cards */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Three Price Cards Test</h2>
          <p className="text-gray-600">
            This should display UPS, DHL, and ARAMEX cards (with ARAMEX unavailable for Spain)
          </p>
        </div>

        {result.data && (
          <MultiCarrierQuotesDisplay
            country={result.data.country}
            quotes={result.data.quotes}
            boxCalculations={result.data.boxCalculations}
            dimensionalAnalysis={result.data.dimensionalAnalysis}
            quantity={result.data.summary?.totalBoxes || 2}
            showDetailedAnalysis={true}
          />
        )}

        {/* Debug Info */}
        <Card className="border-gray-200 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-sm">Debug - API Response Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>multiCarrier flag:</strong> {result.multiCarrier ? '✅ true' : '❌ false'}</p>
              <p><strong>Number of quotes:</strong> {result.data.quotes?.length || 0}</p>
              <p><strong>Available carriers:</strong> {result.data.quotes?.filter((q: any) => q.available).map((q: any) => q.carrier).join(', ')}</p>
              <p><strong>Unavailable carriers:</strong> {result.data.quotes?.filter((q: any) => !q.available).map((q: any) => q.carrier).join(', ')}</p>
              <p><strong>Scenario:</strong> {result.scenario}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
