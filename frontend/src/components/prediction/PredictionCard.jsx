import { Hash } from "lucide-react";

function PredictionCard({ prediction }) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-zinc-800
        bg-[#1b1b1b]
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-yellow-500
        hover:shadow-xl
        hover:shadow-yellow-500/10
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Predicted Word
          </p>

          <h3 className="mt-2 break-words text-2xl font-bold text-white">
            {prediction.word}
          </h3>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-purple-600
            to-violet-500
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          <Hash className="text-white" size={22} />
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-zinc-800" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-[#242424] p-3 text-center">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Score
          </p>

          <p className="mt-2 text-lg font-semibold text-yellow-400">
            {prediction.score !== undefined
              ? prediction.score.toFixed(3)
              : "N/A"}
          </p>
        </div>

        <div className="rounded-xl bg-[#242424] p-3 text-center">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Frequency
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {prediction.frequency ?? "N/A"}
          </p>
        </div>

        <div className="rounded-xl bg-[#242424] p-3 text-center">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Rank
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {prediction.rank ? `#${prediction.rank}` : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PredictionCard;