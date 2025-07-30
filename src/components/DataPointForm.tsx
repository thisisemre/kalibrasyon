import DataPointInput from './DataPointInput';
import ValidationMessage from './ValidationMessage';
import type { DataPoint } from '@/types/calibration';

type DataPointFormProps = {
  dataPoints: DataPoint[];
  validCount: number;
  onAdd: () => void;
  onUpdate: (id: string, field: 'x' | 'y', value: string) => void;
  onRemove: (id: string) => void;
};

export default function DataPointForm({
  dataPoints,
  validCount,
  onAdd,
  onUpdate,
  onRemove
}: DataPointFormProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Veri Noktaları</h2>
      
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-sm font-medium text-gray-600">
          <span>X (Konsantrasyon)</span>
          <span>Y (Ölçüm)</span>
          <span>İşlem</span>
        </div>
        
        {dataPoints.map((point) => (
          <DataPointInput
            key={point.id}
            point={point}
            onUpdate={onUpdate}
            onRemove={onRemove}
            canRemove={dataPoints.length > 1}
          />
        ))}
      </div>
      
      <button
        onClick={onAdd}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
      >
        + Yeni Nokta Ekle
      </button>
      
      <ValidationMessage 
        totalPoints={dataPoints.length} 
        validPoints={validCount} 
      />
    </div>
  );
} 