import { WandSparkles } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center dark:text-white">
      <div className="text-center">
        <WandSparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
        <h1 className="mt-4 text-4xl font-bold tracking-widest">
          <FormattedMessage id="notfound.404" />
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          <FormattedMessage id="notfound.title" />
        </p>
        <p className="mt-1 text-gray-400 italic">
          <FormattedMessage id="notfound.description" />
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all cursor-pointer"
        >
          <FormattedMessage id="notfound.button" />
        </button>
      </div>
    </div>
  );
}
