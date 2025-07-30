import CalibrationChart from './CalibrationChart';
import { calculateLinearRegression } from '@/utils/linearRegression';
import { useEffect, useState, useMemo } from 'react';

type ChartContainerProps = {
  xValues: number[];
  yValues: number[];
  validPointsCount: number;
};

export default function ChartContainer({ 
  xValues, 
  yValues, 
  validPointsCount 
}: ChartContainerProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Memoize regression calculation to prevent unnecessary re-calculations
  const regression = useMemo(() => {
    return calculateLinearRegression(xValues, yValues);
  }, [xValues, yValues]);

  // Animation trigger when equation or R² actually changes
  useEffect(() => {
    if (regression) {
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [regression?.equation, regression?.rSquared , regression]);

  const getRSquaredColor = (rSquared: number): string => {
    if (rSquared >= 0.95) return 'text-green-600';
    if (rSquared >= 0.90) return 'text-green-500';
    if (rSquared >= 0.80) return 'text-yellow-600';
    if (rSquared >= 0.70) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Kalibrasyon Grafiği</h2>
      {validPointsCount >= 2 ? (
        <div className="relative">
          {/* Chart */}
          <CalibrationChart xValues={xValues} yValues={yValues} />
          
          {/* Overlay - Equation and R² */}
          {regression && (
            <div className={`absolute top-4 left-4 chart-overlay rounded-lg p-4 ${isUpdating ? 'value-update' : ''}`}>
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Regresyon Denklemi
                </div>
                <div className={`text-lg font-bold text-blue-700 equation-text ${isUpdating ? 'value-update' : ''}`}>
                  {regression.equation}
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600">R² = </span>
                  <span className={`font-bold ml-1 ${getRSquaredColor(regression.rSquared)}`}>
                    {regression.rSquared.toFixed(4)}
                  </span>
                  <span className="r-squared-badge ml-2">
                    {regression.rSquared >= 0.95 ? 'Mükemmel' :
                     regression.rSquared >= 0.90 ? 'Çok İyi' :
                     regression.rSquared >= 0.80 ? 'İyi' :
                     regression.rSquared >= 0.70 ? 'Orta' : 'Zayıf'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-300 rounded">
          <div className="text-center">
            <div className="text-lg mb-2">📊</div>
            <p>En az 2 geçerli veri noktası girin</p>
            <p className="text-sm mt-1">Grafik otomatik olarak güncellenecek</p>
          </div>
        </div>
      )}
    </div>
  );
} 