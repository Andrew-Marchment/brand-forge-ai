"use client";

import { useGenerator } from "./GeneratorContext";
import ResponseContainer from "./ResponseContainer";
import ImageContainer from "./ImageContainer";
import NameGeneratorForm from "./NameGeneratorForm";
import LogoGeneratorForm from "./LogoGeneratorForm";

function Generator() {
  const { hasName, nameOptions, selectedNameConfirmed, imageUrl, setHasName } =
    useGenerator();

  const hasNameOptions = nameOptions[0] !== "";

  return (
    <>
      <div className="mb-8 rounded-[--radius] p-5 text-start text-card-foreground shadow-lg dark:border dark:border-border sm:mx-3 sm:mb-4">
        {!selectedNameConfirmed && (
          <div className="mb-3 flex items-center gap-2">
            <input
              className="accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              type="checkbox"
              id="nameOption"
              checked={hasName}
              onChange={(e) => setHasName(e.target.checked)}
            />
            <label className="text-xl sm:text-base" htmlFor="nameOption">
              I already have a name for my company.
            </label>
          </div>
        )}
        {!hasName && !selectedNameConfirmed && <NameGeneratorForm />}
        {(hasName || selectedNameConfirmed) && <LogoGeneratorForm />}
      </div>
      {!hasName && hasNameOptions && !selectedNameConfirmed && (
        <ResponseContainer />
      )}
      {hasName && imageUrl && <ImageContainer />}
    </>
  );
}

export default Generator;
