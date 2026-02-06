// frontend/src/components/SlotSelector.jsx
const SlotSelector = ({
  selectedSlot,
  onSelect,
  seatStats,
  disabled = false,
}) => {
  const slots = [
    {
      key: "SLOT_1",
      title: "Slot 1",
      time: "12 PM – 4 PM",
      days: "Saturday & Sunday",
    },
    {
      key: "SLOT_2",
      title: "Slot 2",
      time: "6 PM – 10 PM",
      days: "Saturday & Sunday",
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block font-medium text-[#8A733E]">
        Select Slot
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {slots.map((slot) => {
          const stats = seatStats?.slots?.[slot.key];
          const isFull = stats && stats.remaining === 0;
          const isSelected = selectedSlot === slot.key;

          return (
            <button
              key={slot.key}
              type="button"
              disabled={disabled || isFull}
              onClick={() => onSelect(slot.key)}
              className={`
                border rounded-lg p-4 text-left transition
                ${isSelected ? "border-[#8A733E] ring-2 ring-[#8A733E]" : "border-[#8A733E]/40"}
                ${isFull || disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#8A733E]"}
                bg-[#FFF5DF]
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#8A733E]">
                    {slot.title}
                  </h3>
                  <p className="text-sm text-[#8A733E]">
                    {slot.days}
                  </p>
                  <p className="text-sm text-[#8A733E]">
                    {slot.time}
                  </p>
                </div>

                {isFull && (
                  <span className="text-xs font-semibold text-red-600">
                    Batch Full
                  </span>
                )}
              </div>

              {stats && (
                <div className="mt-3 text-sm text-[#8A733E]">
                  <p>Total Seats: 30</p>
                  <p>Booked: {stats.filled}</p>
                  <p>Remaining: {stats.remaining}</p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SlotSelector;
