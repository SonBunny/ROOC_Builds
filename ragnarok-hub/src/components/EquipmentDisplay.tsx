import type { Equipment } from '../types/builds';

interface EquipmentDisplayProps {
  equipment: Equipment;
}

export default function EquipmentDisplay({ equipment }: EquipmentDisplayProps) {
  const slots = [
    { key: 'head' as keyof Equipment, label: 'Head' },
    { key: 'armor' as keyof Equipment, label: 'Armor' },
    { key: 'weapon' as keyof Equipment, label: 'Weapon' },
    { key: 'shield' as keyof Equipment, label: 'Shield' },
    { key: 'garment' as keyof Equipment, label: 'Garment' },
    { key: 'shoes' as keyof Equipment, label: 'Shoes' },
    { key: 'accessory1' as keyof Equipment, label: 'Accessory 1' },
    { key: 'accessory2' as keyof Equipment, label: 'Accessory 2' },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-white">Equipment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot) => {
          const item = equipment[slot.key];
          if (!item) return null;

          return (
            <div key={slot.key} className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">{slot.label}</div>
              <div className="font-bold text-white">{item.name}</div>
              <div className="text-sm text-blue-400">+{item.refine}</div>
              {item.cards && item.cards.length > 0 && (
                <div className="mt-2 space-y-1">
                  {item.cards.map((card, i) => (
                    <div key={i} className="text-xs text-purple-400">
                      {card}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
