"use client";

import { useState } from "react";
import { useGenerator } from "./GeneratorContext";
import { useChat } from "ai/react";
import SubmitButton from "./SubmitButton";
import SpinnerMini from "./SpinnerMini";

function LogoGeneratorForm() {
  const [logoStyle, setLogoStyle] = useState("any");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [error, setError] = useState("");

  const {
    companyName,
    companyDescription,
    selectedNameConfirmed,
    setCompanyName,
    setCompanyDescription,
    setImagePrompt,
    setImageUrl,
  } = useGenerator();

  const { append, handleSubmit, isLoading } = useChat({
    api: "/api/gpt",
    onFinish: (message) => {
      setError("");
      console.log(message.content);
      // getImageData(message.content).then();

      // store image prompt for development sake
      setImagePrompt(message.content);
    },
    onError: (error) => {
      setError(`An error occured calling the OpenAI API: ${error.message}`);
    },
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    append({
      role: "system",
      content: `Create a prompt for dall-e 3 to create a logo for a company using the following structure:
      Company Name: Clearly state the name of the company.
Company Description: Provide a brief description of what the company does.
Logo Style: Specify the style of the logo (modern, vintage, minimalist, etc.).
Colors: Mention any specific colors you want to be included.
Elements: Include any symbols, icons, or elements that should be part of the logo.
Text: Indicate if the logo should include the company name or any tagline.
Tone and Feeling: Describe the tone or feeling you want the logo to convey (professional, playful, elegant, etc.).
 Use the following information to create the prompt: Company name: "${companyName}"
 Company description: "${companyDescription}"
 Logo style: "${
   logoStyle === "any"
     ? "choose one of the following options that best matches the company name and description: minimalist, vintage, modern, hand-drawn, flat, mascot, emblem, abstract, or geometric"
     : logoStyle
 }".
      Here is an example to follow: Create a logo for a company named 'EcoTech Innovations'. This company specializes in sustainable technology solutions. The logo should have a modern and minimalist style, incorporating shades of green and blue to represent eco-friendliness and technology. Include an icon of a leaf combined with a circuit board to symbolize the fusion of nature and technology. The logo should also feature the company name 'EcoTech Innovations' in a clean, sans-serif font, conveying a professional and innovative tone.`,
    });

    handleSubmit(event);
    setDisableSubmitButton(true);
  }

  const getImageData = async (prompt: string) => {
    try {
      setIsLoadingImage(true);
      const response = await fetch("/api/dall-e", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const { imageUrl } = await response.json();
      setImageUrl(imageUrl);
      setError("");
    } catch (error) {
      setError(`An error occurred calling the Dall-E API: ${error}`);
    }
    setIsLoadingImage(false);
  };

  return (
    <form onSubmit={onSubmit} className="text-card-foreground">
      <label className="mb-3 block text-xl sm:text-base" htmlFor="companyName">
        {selectedNameConfirmed
          ? "Chosen company name:"
          : "1. Give us the name of your company."}
      </label>
      <input
        className="mb-3 w-full rounded-[--radius] border border-input bg-card p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:bg-muted/50 disabled:text-muted-foreground sm:text-sm"
        id="companyName"
        placeholder="Feline Fury eSports"
        value={companyName}
        onChange={(e) => {
          setCompanyName(e.target.value);
          setDisableSubmitButton(false);
        }}
        disabled={selectedNameConfirmed}
        required
      />

      <label className="mb-3 block text-xl sm:text-base" htmlFor="infoInput">
        {selectedNameConfirmed
          ? "Given company description:"
          : "(Optional) Give us some information about your company."}
      </label>
      <textarea
        className="mb-3 w-full resize-none rounded-[--radius] border border-input bg-card p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:bg-muted/50 disabled:text-muted-foreground sm:text-sm"
        id="infoInput"
        rows={4}
        placeholder="A League of Legends eSports team with a cute cat theme"
        value={companyDescription}
        onChange={(e) => {
          setCompanyDescription(e.target.value);
          setDisableSubmitButton(false);
        }}
        disabled={selectedNameConfirmed}
      />

      <label className="mb-3 block text-xl sm:text-base" htmlFor="logoStyle">
        2. Select a style for your logo.
      </label>
      <select
        className="mb-5 w-full rounded-[--radius] border border-input bg-card p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm"
        id="logoStyle"
        value={logoStyle}
        onChange={(e) => {
          setLogoStyle(e.target.value);
          setDisableSubmitButton(false);
        }}
        disabled={isLoading || isLoadingImage}
        required
      >
        <option value="any">Let the AI decide</option>
        <option value="minimalist">Minimalist</option>
        <option value="vintage">Vintage</option>
        <option value="modern">Modern</option>
        <option value="hand-drawn">Hand-Drawn</option>
        <option value="flat">Flat</option>
        <option value="mascot">Mascot</option>
        <option value="emblem">Emblem</option>
        <option value="abstract">Abstract</option>
        <option value="geometric">Geometric</option>
      </select>

      <SubmitButton
        isLoading={isLoading || isLoadingImage}
        pendingLabel={<SpinnerMini />}
        disable={disableSubmitButton}
      >
        Generate Logo
      </SubmitButton>
      {error && <p className="w-full text-red-500">{error}</p>}
    </form>
  );
}

export default LogoGeneratorForm;
