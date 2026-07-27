// components/common/Logo.jsx

import { BrainCircuit } from "lucide-react";

const Logo = ({
  compact = false,
  size = 36,
  title = "RAG AI Workspace",
  subtitle = "Knowledge Assistant",
}) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className="flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-md"
        style={{
          width: size,
          height: size,
        }}
      >
        <BrainCircuit size={size * 0.6} strokeWidth={2.2} />
      </div>

      {!compact && (
        <div className="leading-tight">
          <h1 className="text-lg font-bold text-gray-900">
            {title}
          </h1>

          <p className="text-xs text-gray-500">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;