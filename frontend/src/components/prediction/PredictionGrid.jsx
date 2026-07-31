import { Lightbulb } from "lucide-react";

function PredictionGrid({
  predictions = [],
  onSelectPrediction,
}) {
  if (!predictions.length) {
    return (
      <section className="rounded-3xl border border-zinc-800 bg-[#151922] p-6">

        <h2 className="text-2xl font-bold text-white">
          Predicted Next Words
        </h2>

        <div className="mt-6 flex h-40 items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-[#10141c] text-zinc-500">
          No predictions available.
        </div>

      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-zinc-800 bg-[#151922] p-6">

      {/* Header */}

      <div className="mb-6 flex items-end">

        <h2 className="text-2xl font-bold text-white">
          Predicted Next Words
        </h2>

        <span className="ml-3 text-sm text-zinc-500">
          Top {predictions.length}
        </span>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-5 gap-4">

        {predictions.map((prediction, index) => (
          <button
            key={`${prediction.word}-${index}`}
            onClick={() => onSelectPrediction?.(prediction.word)}
            className="
              group
              flex
              h-32
              flex-col
              justify-between
              rounded-2xl
              border
              border-zinc-700
              bg-[#10141c]
              p-4
              text-left
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-amber-400
              hover:bg-[#161b25]
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-amber-500
                  text-xs
                  font-bold
                  text-black
                "
              >
                {index + 1}
              </div>

              <span className="truncate text-base font-semibold text-white">
                {prediction.word}
              </span>

            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Confidence
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {(prediction.score * 100).toFixed(0)}%
              </p>

            </div>

          </button>
        ))}

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-start gap-3 border-t border-zinc-800 pt-4">

        <Lightbulb
          size={18}
          className="mt-0.5 shrink-0 text-amber-400"
        />

        <p className="text-sm leading-6 text-zinc-400">
          Click any predicted word to append it to the input and generate the
          next set of predictions.
        </p>

      </div>

    </section>
  );
}

export default PredictionGrid;