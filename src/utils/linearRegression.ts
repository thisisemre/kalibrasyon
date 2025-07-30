import type { RegressionResult } from '@/types/calibration';

export function calculateLinearRegression(xValues: number[], yValues: number[]): RegressionResult | null {
  if (xValues.length !== yValues.length || xValues.length < 2) {
    return null;
  }

  const n = xValues.length;
  
  // Ortalama değerler
  const xMean = xValues.reduce((sum, x) => sum + x, 0) / n;
  const yMean = yValues.reduce((sum, y) => sum + y, 0) / n;
  
  // Toplam kareler hesaplamaları
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = xValues[i] - xMean;
    const yDiff = yValues[i] - yMean;
    
    sumXY += xDiff * yDiff;
    sumXX += xDiff * xDiff;
    sumYY += yDiff * yDiff;
  }
  
  // Eğim (slope) ve y-kesişim (intercept)
  const slope = sumXY / sumXX;
  const intercept = yMean - slope * xMean;
  
  // Korelasyon katsayısı (r)
  const correlation = sumXY / Math.sqrt(sumXX * sumYY);
  
  // R² değeri
  const rSquared = correlation * correlation;
  
  // Denklem stringi oluşturma
  const slopeFormatted = Number(slope.toFixed(4));
  const interceptFormatted = Number(intercept.toFixed(4));
  
  let equation: string;
  if (interceptFormatted >= 0) {
    equation = `y = ${slopeFormatted}x + ${interceptFormatted}`;
  } else {
    equation = `y = ${slopeFormatted}x - ${Math.abs(interceptFormatted)}`;
  }
  
  return {
    slope: Number(slope.toFixed(6)),
    intercept: Number(intercept.toFixed(6)),
    rSquared: Number(rSquared.toFixed(6)),
    equation,
    correlation: Number(correlation.toFixed(6))
  };
} 