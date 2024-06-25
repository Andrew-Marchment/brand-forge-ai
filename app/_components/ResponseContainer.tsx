import { useChat } from "ai/react";
import { useGenerator } from "./GeneratorContext";
import { ReactElement, useState } from "react";
import { RefreshCcw } from "lucide-react";

const ResponseContainer = (): ReactElement => {
  const [error, setError] = useState("");
  const [oldNameOptions, setOldNameOptions] = useState([""]);

  const {
    nameOptions,
    companyDescription,
    selectedName,
    setHasName,
    setCompanyName,
    setNameOptions,
    setSelectedName,
    setSelectedNameConfirmed,
  } = useGenerator();

  const { append, isLoading } = useChat({
    api: "/api/gpt",
    onFinish: (message) => {
      setError("");
      const generatedNameContent = message.content;
      const generatedNameArray = generatedNameContent.split(", ");
      setNameOptions(generatedNameArray);
    },
    onError: (error) => {
      setError(`An error occured calling the OpenAI API: ${error.message}`);
    },
  });

  return (
    <div className="m-auto max-w-lg rounded-[--radius] p-5 text-card-foreground shadow-lg dark:border dark:border-border sm:mx-3">
      <p className="mb-3 text-start text-lg sm:text-base">
        Choose one of the names from the list below or click
        &quot;Regenerate&quot; to generate different options.
      </p>
      <ul className="mb-3 flex flex-col gap-1">
        {nameOptions.map((name) => (
          <li key={name}>
            <button
              className={`w-full rounded-[--radius] border border-border p-2 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                name === selectedName
                  ? "text-primary"
                  : "bg-secondary text-secondary-foreground transition-all duration-300 hover:bg-secondary/0"
              } `}
              onClick={() => setSelectedName(name)}
              disabled={name === selectedName}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
      {selectedName && (
        <p className="mb-3">
          Selected name:{" "}
          <span className="font-semibold text-primary">{selectedName}</span>
        </p>
      )}

      <div className="flex items-center justify-between text-sm">
        <button
          className="flex items-center gap-2 rounded-[--radius] bg-secondary px-3 py-2 text-secondary-foreground transition-all duration-300 hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:bg-secondary/50 disabled:text-secondary-foreground/50"
          onClick={() => {
            setSelectedName("");
            const currNameOptions = [...oldNameOptions, ...nameOptions];
            setOldNameOptions(currNameOptions);
            append({
              role: "system",
              content: `Create an unordered list of four company name ideas, separated by commas with no dash at the start, based on the following company description: ${companyDescription}. Do not use any of the following names:${currNameOptions.map(
                (name) => ` ${name}`,
              )}`,
            });
          }}
          disabled={isLoading}
        >
          <span>Regenerate</span>
          <RefreshCcw className={isLoading ? "rotate" : ""} size={16} />
        </button>
        {selectedName && (
          <button
            className="rounded-[--radius] bg-primary px-3 py-2 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => {
              setSelectedNameConfirmed();
              setCompanyName(selectedName);
              setHasName(true);
            }}
          >
            Confirm selection
          </button>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ResponseContainer;
