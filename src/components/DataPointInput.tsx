import type { DataPoint } from '@/types/calibration';

type DataPointInputProps = {
  point: DataPoint;
  onUpdate: (id: string, field: 'x' | 'y', value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
};

export default function DataPointInput({ 
  point, 
  onUpdate, 
  onRemove, 
  canRemove 
}: DataPointInputProps) {
  return (
    <div className="grid grid-cols-3 gap-2 items-center">
      <input
        type="number"
        step="any"
        value={point.x}
        onChange={(e) => onUpdate(point.id, 'x', e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="X değeri"
      />
      <input
        type="number"
        step="any"
        value={point.y}
        onChange={(e) => onUpdate(point.id, 'y', e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Y değeri"
      />
      <button
        onClick={() => onRemove(point.id)}
        disabled={!canRemove}
        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
      >
        Sil
      </button>
    </div>
  );
} 