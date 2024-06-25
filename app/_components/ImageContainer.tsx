import { ReactElement } from "react";
import { useGenerator } from "./GeneratorContext";
import Image from "next/image";

function ImageContainer(): ReactElement {
  const { imageUrl, companyName } = useGenerator();

  return (
    <div className="m-auto max-w-lg rounded-[--radius] bg-card p-5 shadow-lg dark:border dark:border-border sm:mx-3">
      {imageUrl && (
        <a
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          target="_blank"
          href={imageUrl}
        >
          <Image src={imageUrl} alt={companyName} width={475} height={475} />
        </a>
      )}
    </div>
  );
}

export default ImageContainer;
