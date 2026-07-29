import { Hash } from "lucide-react";

function PredictionCard({ prediction }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 hover:shadow-lg transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            Predicted Word
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {prediction.word}
          </h3>
        </div>

        <div className="bg-blue-100 p-3 rounded-lg">
          <Hash className="text-blue-600" size={24} />
        </div>

      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 text-center">

        <div>
          <p className="text-xs text-slate-500">Score</p>
          <p className="font-semibold">
            {prediction.score?.toFixed(3)}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Frequency</p>
          <p className="font-semibold">
            {prediction.frequency}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Rank</p>
          <p className="font-semibold">
            #{prediction.rank}
          </p>
        </div>

      </div>

    </div>
  );
}

export default PredictionCard;