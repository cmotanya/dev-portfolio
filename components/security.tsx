import { securityOptions } from "@/app/data/about";
import { ArrowRight, BadgeCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fade } from "react-awesome-reveal";

const Security = () => {
  const router = useRouter();

  return (
    <>
      <Fade cascade delay={300} duration={300}>
        <h2 className="text-primary mb-4 text-xl font-bold">
          Security System Solutions
        </h2>

        <div>
          {securityOptions.map((option) => (
            <div
              key={option.id}
              className="border-secondary mb-2 rounded-lg border bg-white/95 px-2.5 py-2"
            >
              <span className="text-primary">{option.icon}</span>
              <h3 className="mb-2 font-bold">{option.title}</h3>
              <p className="text-justify">{option.description}</p>
              <button
                onClick={() =>
                  router.push(`/contact?service=security&type=${option.id}`)
                }
                className="bg-secondary flex items-center gap-1 rounded-full p-2 text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-xl active:scale-105"
              >
                Request Quote <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-white px-2.5 py-2">
          {" "}
          <h3 className="text-primary my-2 text-xl font-bold">
            Site Assessment
          </h3>{" "}
          <ul className="space-y-2 text-justify">
            {" "}
            <li className="flex items-start gap-3">
              {" "}
              <span className="text-secondary flex-shrink-0 rounded-full">
                {" "}
                <BadgeCheckIcon />
              </span>{" "}
              <span>
                Free onsite evaluation to understand your security needs
              </span>{" "}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary flex-shrink-0 rounded-full">
                {" "}
                <BadgeCheckIcon />
              </span>{" "}
              <span>
                Tailored security solution based on your requirements
              </span>{" "}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary flex-shrink-0 rounded-full">
                {" "}
                <BadgeCheckIcon />
              </span>{" "}
              <span>Expert setup and training on your new system</span>{" "}
            </li>
          </ul>
        </div>
      </Fade>
    </>
  );
};

export default Security;
// Compare this snippet from components/web-dev.tsx:
