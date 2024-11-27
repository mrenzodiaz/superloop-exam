import clsx from 'clsx';

type CardImageProps = {
  title: string;
  description: string;
  url: string;
  alt: string;
  isFlag: boolean;
};

export function CardImage({
  title,
  description,
  url,
  alt,
  isFlag = false,
}: CardImageProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden dark:shadow-secondary/80 transition-all duration-300 hover:shadow-lg dark:bg-background">
        {url ? (
          <img
            src={url}
            alt={alt}
            width={400}
            height={250}
            className={clsx('w-full h-64', {
              'object-cover': isFlag,
              'object-contain': !isFlag,
            })}
          />
        ) : (
          <div className="w-[400px] h-[250px] flex items-center justify-center">
            <span className="text-left md:text-center">NO IMAGE AVAILABLE</span>
          </div>
        )}
        <div className="p-4 space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-justify">{description}</p>
        </div>
      </div>
    </div>
  );
}
