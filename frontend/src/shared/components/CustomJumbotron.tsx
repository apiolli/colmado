interface Props {
  title: string;
  subtitle: string;
}

export const CustomJumbotron = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title} Hola
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {/* {actions && <div className="flex flex-wrap gap-2">{actions}</div>} */}
    </div>
  );
};
