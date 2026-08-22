import {
  BrainCircuit,
  History,
  CheckCircle2,
} from "lucide-react";

function PredictionHeader() {
  return (
    <header className="flex items-center justify-between gap-6">

      {/* Left */}

      <div className="flex min-w-0 items-center gap-5">

        <div
          className="
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-violet-500/20
            bg-violet-500/10
            shadow-lg
            shadow-violet-500/10
          "
        >
          <BrainCircuit
            size={30}
            className="text-violet-400"
          />
        </div>

        <div className="min-w-0">

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Word Prediction
          </h1>

          <p className="mt-1 max-w-3xl text-base leading-6 text-zinc-400">
            Predict the next word using retrieved context and
            Retrieval-Augmented Generation (RAG).
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex shrink-0 items-center gap-3">

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900/80
            px-5
            py-3
            text-zinc-300
            transition-all
            duration-200
            hover:border-zinc-600
            hover:bg-zinc-800
            hover:text-white
          "
        >
          <History size={18} />

          <span className="font-medium">
            View History
          </span>
        </button>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900/80
            px-5
            py-3
          "
        >
          <CheckCircle2
            size={16}
            className="text-green-400"
          />

          <span className="font-medium text-white">
            Ready
          </span>
        </div>

      </div>

    </header>
  );
}

export default PredictionHeader;