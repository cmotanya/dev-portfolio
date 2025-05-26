export const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group bg-secondary rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
      <div className="bg-primary text-accent mb-4 inline-flex rounded-xl p-3">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-secondary-text text-xs-sm">{description}</p>
    </div>
  );
};
