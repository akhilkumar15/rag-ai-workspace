import {
  BrainCircuit,
  History,
  CheckCircle2,
} from "lucide-react";

function PredictionHeader() {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div className="flex items-center gap-5">

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
          "
        >
          <BrainCircuit
            size={30}
            className="text-violet-400"
          />
        </div>

        <div>

          <h1 className="text-[52px] leading-none font-bold tracking-tight text-white">
            Word Prediction
          </h1>

          <p className="mt-1 text-[18px] leading-6 text-zinc-400">
            Predict the next word using retrieved context and
            Retrieval-Augmented Generation (RAG).
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900
            px-4
            py-2.5
            text-sm
            font-medium
            text-zinc-300
            transition-colors
            hover:border-zinc-600
            hover:bg-zinc-800
            hover:text-white
          "
        >
          <History size={17} />
          View History
        </button>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900
            px-4
            py-2.5
          "
        >
          <CheckCircle2
            size={16}
            className="text-green-400"
          />

          <span className="text-sm font-medium text-white">
            Ready
          </span>

        </div>

      </div>

    </header>
  );
}

export default PredictionHeader;