export type DataPoint = {
  id: string;
  x: string;
  y: string;
};

export type ValidationStatus = {
  totalPoints: number;
  validPoints: number;
};

export type ChartData = {
  xValues: number[];
  yValues: number[];
};

export type RegressionResult = {
  slope: number;          // Eğim (m)
  intercept: number;      // y-kesişim (b)
  rSquared: number;       // R² değeri
  equation: string;       // y = mx + b formatında denklem
  correlation: number;    // Korelasyon katsayısı (r)
}; 