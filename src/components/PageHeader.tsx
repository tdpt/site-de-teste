interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <section className="min-h-[40vh] bg-primary flex items-center justify-center pt-20">
      <div className="container-max section-padding text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
