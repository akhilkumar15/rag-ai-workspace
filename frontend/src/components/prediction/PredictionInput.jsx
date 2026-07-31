import { useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

function PredictionInput({
  onPredict,
  loading,
  onClear,
}) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();

    if (!trimmed || loading) return;

    onPredict(trimmed);
  };

  const handleClear = () => {
    if (loading) return;

    setText("");
    onClear?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div>

      <h2 className="text-2xl font-bold text-white">
        Input Phrase
      </h2>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row">

        <input
          value={text}
          disabled={loading}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Artificial Intelligence is..."
          className="
            h-14
            flex-1
            rounded-2xl
            border
            border-zinc-700
            bg-[#10141c]
            px-5
            text-white
            placeholder:text-zinc-500
            outline-none
            focus:border-amber-400
            focus:ring-2
            focus:ring-amber-400/20
          "
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            flex
            h-14
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-amber-500
            px-7
            font-semibold
            text-black
            hover:bg-amber-400
          "
        >
          <Sparkles size={18}/>
          {loading ? "Predicting..." : "Predict"}
        </button>

        <button
          onClick={handleClear}
          disabled={loading}
          className="
            flex
            h-14
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900
            px-7
            text-zinc-300
            hover:bg-zinc-800
            hover:text-white
          "
        >
          <RotateCcw size={18}/>
          Clear
        </button>

      </div>

      <p className="mt-4 text-sm text-zinc-400">
        Press <span className="font-semibold text-white">Enter</span> to
        predict, or click a predicted word below.
      </p>

    </div>
  );
}

export default PredictionInput;