"use client";

import Generator from "./_components/Generator";
import {
  GeneratorProvider,
  initialState,
} from "./_components/GeneratorContext";

export default function Home() {
  return (
    <main className="m-0 flex min-h-screen bg-background text-center text-foreground">
      <div className="mx-auto my-12">
        <h1 className="mb-10 mt-24 max-w-xl text-5xl tracking-tight sm:mx-4 sm:my-8 sm:text-3xl">
          Generate a name and logo for your company using AI
        </h1>
        <GeneratorProvider
          hasName={initialState.hasName}
          companyName={initialState.companyName}
          companyDescription={initialState.companyDescription}
          nameOptions={initialState.nameOptions}
          selectedName={initialState.selectedName}
          selectedNameConfirmed={initialState.selectedNameConfirmed}
          imagePrompt={initialState.imagePrompt}
          imageUrl={initialState.imageUrl}
        >
          <Generator />
        </GeneratorProvider>
      </div>
    </main>
  );
}
