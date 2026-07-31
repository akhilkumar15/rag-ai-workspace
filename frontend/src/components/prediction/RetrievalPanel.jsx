import {
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

function RetrievalPanel({
  context = [],
  useSampleData = false,
}) {
  const sampleChunk = {
    title: "Wikipedia: Artificial Intelligence",
    content:
      "Artificial Intelligence is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals. AI is a broad field that encompasses machine learning, natural language processing, robotics, and more.",
    similarity: 0.91,
    source: "wiki_015.txt",
  };

  const chunk =
    useSampleData || context.length === 0
      ? sampleChunk
      : context[0];

  return (
    <aside className="h-fit rounded-3xl border border-zinc-800 bg-[#151922] p-5 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-[26px] font-bold tracking-tight text-white">
          Retrieved Context
        </h2>

        <div className="flex items-center gap-2">

          <button className="rounded-lg border border-zinc-700 p-2 transition hover:bg-zinc-800">
            <ChevronLeft size={17} className="text-zinc-300" />
          </button>

          <span className="min-w-[56px] text-center text-sm text-zinc-500">
            1 of 5
          </span>

          <button className="rounded-lg border border-zinc-700 p-2 transition hover:bg-zinc-800">
            <ChevronRight size={17} className="text-zinc-300" />
          </button>

        </div>

      </div>

      {/* Context Card */}

      <div className="mt-5 rounded-2xl border border-zinc-700 bg-[#10141c] p-5">

        <h3 className="text-lg font-semibold text-white">
          {chunk.title}
        </h3>

        <p className="mt-3 text-[15px] leading-7 text-zinc-300">
          {chunk.content}
        </p>

        <div className="mt-5 border-t border-zinc-700 pt-5">

          <div className="grid grid-cols-2 gap-5">

            <div>

              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Similarity Score
              </p>

              <div className="mt-3 flex items-center gap-3">

                <span className="text-2xl font-bold text-white">
                  {chunk.similarity.toFixed(2)}
                </span>

                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-700">

                  <div
                    className="h-full rounded-full bg-zinc-400"
                    style={{
                      width: `${chunk.similarity * 100}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Source
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">

                <FileText
                  size={17}
                  className="text-zinc-400"
                />

                <span className="truncate">
                  {chunk.source}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      <button
        className="
          mt-5
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900
          py-2.5
          text-sm
          font-medium
          text-zinc-300
          transition
          hover:bg-zinc-800
        "
      >
        View All Retrieved Chunks
      </button>

    </aside>
  );
}

export default RetrievalPanel;