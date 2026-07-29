// frontend/src/components/common/LoadingSpinner.jsx

import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  size = 40,
  text = "Loading...",
  fullScreen = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        size={size}
        className="animate-spin text-blue-600"
      />

      <p className="text-sm text-gray-500 font-medium">
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      {content}
    </div>
  );
};

export default LoadingSpinner;