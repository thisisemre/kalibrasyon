'use client';

import { useState } from 'react';
import DataPointForm from "@/components/DataPointForm";
import ChartContainer from "@/components/ChartContainer";
import RegressionInfo from "@/components/RegressionInfo";
import type { DataPoint } from "@/types/calibration";

export default function Home() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: '1', x: '1', y: '2' },
    { id: '2', x: '2', y: '4.1' },
    { id: '3', x: '3', y: '6.2' },
  ]);

  const addDataPoint = () => {
    const newId = (dataPoints.length + 1).toString();
    setDataPoints([...dataPoints, { id: newId, x: '', y: '' }]);
  };

  const removeDataPoint = (id: string) => {
    if (dataPoints.length > 1) {
      setDataPoints(dataPoints.filter(point => point.id !== id));
    }
  };

  const updateDataPoint = (id: string, field: 'x' | 'y', value: string) => {
    setDataPoints(dataPoints.map(point => 
      point.id === id ? { ...point, [field]: value } : point
    ));
  };

  // Valid data için filtreleme ve dönüştürme
  const validDataPoints = dataPoints.filter(point => 
    point.x.trim() !== '' && point.y.trim() !== '' && 
    !isNaN(Number(point.x)) && !isNaN(Number(point.y))
  );

  const xValues = validDataPoints.map(point => Number(point.x));
  const yValues = validDataPoints.map(point => Number(point.y));

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kalibrasyon Veri Girişi & Analizi</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DataPointForm
          dataPoints={dataPoints}
          validCount={validDataPoints.length}
          onAdd={addDataPoint}
          onUpdate={updateDataPoint}
          onRemove={removeDataPoint}
        />
        
        <ChartContainer
          xValues={xValues}
          yValues={yValues}
          validPointsCount={validDataPoints.length}
        />
      </div>
      
      {/* Regresyon Analizi Bölümü */}
      <div className="mt-6">
        <RegressionInfo 
          xValues={xValues} 
          yValues={yValues} 
        />
      </div>
    </main>
  );
}
