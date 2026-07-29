// frontend/src/components/common/ErrorMessage.jsx

import { AlertCircle } from "lucide-react";

const ErrorMessage = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}) => {
  return (
    <div className="w-full rounded-xl border border-red-200 bg-red-50 p-5">
      <div className="flex items-start gap-3">
        <AlertCircle
          size={28}
          className="text-red-600 flex-shrink-0"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-700">
            {title}
          </h3>

          <p className="mt-1 text-sm text-red-600">
            {message}
          </p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;