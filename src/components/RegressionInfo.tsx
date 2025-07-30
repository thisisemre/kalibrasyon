import { calculateLinearRegression } from '@/utils/linearRegression';

type RegressionInfoProps = {
  xValues: number[];
  yValues: number[];
};

export default function RegressionInfo({ xValues, yValues }: RegressionInfoProps) {
  const regression = calculateLinearRegression(xValues, yValues);
  
  if (!regression || xValues.length < 2) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold mb-2">📊 Regresyon Analizi</h3>
        <p className="text-gray-500 text-sm">En az 2 geçerli veri noktası gerekli</p>
      </div>
    );
  }

  const getCorrelationQuality = (rSquared: number): { text: string; color: string } => {
    if (rSquared >= 0.95) return { text: 'Mükemmel', color: 'text-green-600' };
    if (rSquared >= 0.90) return { text: 'Çok İyi', color: 'text-green-500' };
    if (rSquared >= 0.80) return { text: 'İyi', color: 'text-yellow-600' };
    if (rSquared >= 0.70) return { text: 'Orta', color: 'text-orange-500' };
    return { text: 'Zayıf', color: 'text-red-500' };
  };

  const quality = getCorrelationQuality(regression.rSquared);

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <h3 className="text-md font-semibold mb-3 text-blue-800">📊 Regresyon Analizi</h3>
      
      <div className="space-y-2 text-sm">
        {/* Denklem */}
        <div className="bg-white p-3 rounded border">
          <span className="font-medium text-gray-700">Denklem:</span>
          <div className="text-lg font-mono mt-1 text-blue-700">
            {regression.equation}
          </div>
        </div>
        
        {/* R² Değeri */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-2 rounded border">
            <span className="font-medium text-gray-700">R² Değeri:</span>
            <div className="text-lg font-semibold">
              {regression.rSquared.toFixed(4)}
            </div>
            <div className={`text-xs ${quality.color} font-medium`}>
              ({quality.text})
            </div>
          </div>
          
          <div className="bg-white p-2 rounded border">
            <span className="font-medium text-gray-700">Korelasyon (r):</span>
            <div className="text-lg font-semibold">
              {regression.correlation.toFixed(4)}
            </div>
          </div>
        </div>
        
        {/* Katsayılar */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-2 rounded border">
            <span className="font-medium text-gray-700">Eğim (m):</span>
            <div className="font-mono text-sm">
              {regression.slope.toFixed(6)}
            </div>
          </div>
          
          <div className="bg-white p-2 rounded border">
            <span className="font-medium text-gray-700">Y-kesişim (b):</span>
            <div className="font-mono text-sm">
              {regression.intercept.toFixed(6)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Kalite açıklaması */}
      <div className="mt-3 text-xs text-gray-600 bg-white p-2 rounded border">
        <strong>R² Yorumu:</strong> Veri noktalarının doğrusal modele ne kadar uygun olduğunu gösterir. 
        1.0&apos;a yakın değerler daha iyi uyumu ifade eder.
      </div>
    </div>
  );
} 