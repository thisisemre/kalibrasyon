type ValidationMessageProps = {
  totalPoints: number;
  validPoints: number;
};

export default function ValidationMessage({ 
  totalPoints, 
  validPoints 
}: ValidationMessageProps) {
  return (
    <div className="mt-4 text-sm text-gray-600">
      <p>Geçerli nokta sayısı: {validPoints}</p>
      {totalPoints !== validPoints && (
        <p className="text-orange-600">
          ⚠️ Bazı satırlarda geçersiz veri var (boş veya sayısal olmayan)
        </p>
      )}
    </div>
  );
} 