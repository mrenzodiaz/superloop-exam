type CardImageProps = {
  title: string;
  description: string;
  url: string;
  alt: string;
};

export function CardImage({ title, description, url, alt }: CardImageProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden dark:shadow-secondary/80 transition-all duration-300 hover:shadow-lg dark:bg-background">
        <img
          src={url}
          alt={alt}
          width={400}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}