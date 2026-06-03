interface Props {
  currentStep: number;
}

function BookingSteps({ currentStep }: Props) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`w-10 h-10 rounded-full flex items-center justify-center
          ${
            currentStep >= step
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}

export default BookingSteps;