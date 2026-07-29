// frontend/src/components/common/EmptyState.jsx

import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "Nothing to display",
  description = "Start by performing an action to see results here.",
  icon: Icon = Inbox,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 px-6 text-center">
      <div className="mb-4 rounded-full bg-blue-100 p-4">
        <Icon size={40} className="text-blue-600" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;