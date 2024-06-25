"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { useGenerator } from "./GeneratorContext";
import SpinnerMini from "./SpinnerMini";
import SubmitButton from "./SubmitButton";

function NameGeneratorForm() {
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [error, setError] = useState("");

  const {
    companyDescription,
    setCompanyDescription,
    setNameOptions,
    setSelectedName,
  } = useGenerator();

  const { setMessages, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/gpt",
    onFinish: (message) => {
      setError("");
      const generatedNameContent = message.content;
      const generatedNameArray = generatedNameContent.split(", ");
      setNameOptions(generatedNameArray);
    },
    onError: (error) => {
      setError(`An error occured calling the OpenAI API: ${error}`);
    },
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSelectedName("");
    handleSubmit(event);
    setDisableSubmitButton(true);
  }

  return (
    <form onSubmit={onSubmit} className="text-card-foreground">
      <label className="mb-3 block text-xl sm:text-base" htmlFor="infoInput">
        1. Give us some information about your company.
      </label>
      <textarea
        className="mb-3 w-full resize-none rounded-[--radius] border border-input bg-card p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm"
        id="infoInput"
        rows={4}
        placeholder="A League of Legends eSports team with a cute cat theme"
        value={companyDescription}
        onChange={(e) => {
          setCompanyDescription(e.target.value);
          handleInputChange({
            ...e,
            target: {
              ...e.target,
              value: `Create an unordered list of four company name ideas, separated by commas with no dash at the start, based on the following company description: ${companyDescription}`,
            },
          });
          setDisableSubmitButton(false);
        }}
        onPaste={(e) => {
          const paste = e.clipboardData.getData("Text");
          setMessages([
            {
              id: "",
              role: "system",
              content: `Create an unordered list of four company name ideas, separated by commas with no dash at the start, based on the following company description: ${paste}`,
            },
          ]);
        }}
        disabled={isLoading}
        required
      />
      <SubmitButton
        isLoading={isLoading}
        pendingLabel={<SpinnerMini />}
        disable={disableSubmitButton}
      >
        Generate names
      </SubmitButton>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default NameGeneratorForm;
