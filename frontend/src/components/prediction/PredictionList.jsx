import PredictionCard from "./PredictionCard";

function PredictionList({ predictions }) {

  if (!predictions.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center text-slate-500">
        No predictions yet.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {predictions.map((prediction, index) => (
        <PredictionCard
          key={index}
          prediction={prediction}
        />
      ))}

    </div>
  );
}

export default PredictionList;