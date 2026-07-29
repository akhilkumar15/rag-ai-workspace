import { useState } from "react";
import { SendHorizontal } from "lucide-react";

function PredictionInput({ onPredict, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onPredict(text);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-2">
        Word Prediction
      </h2>

      <p className="text-slate-500 mb-6">
        Enter a phrase and predict the next word.
      </p>

      <div className="flex gap-3">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Example: Artificial Intelligence"
          className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </button>

      </div>

    </div>
  );
}

export default PredictionInput;