import { securityOptions, siteAssessment } from "@/app/data/about";
import { BadgeCheckIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";

const Security = () => {
  return (
    <>
      <Fade cascade duration={300}>
        <h2 className="mb-4 text-2xl font-medium">Security System Solutions</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {securityOptions.map((option) => (
            <div
              key={option.id}
              className="border-secondary bg-primary/50 mb-2 rounded-lg border px-2.5 py-2"
            >
              <span className="text-secondary">{option.icon}</span>
              <h3 className="mb-2 text-xl font-medium">{option.title}</h3>
              <p className="text-xs-sm text-left">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="px-2.5 py-2">
          {" "}
          <h3 className="my-4 text-xl font-medium">Site Assessment</h3>{" "}
          <ul className="space-y-1 text-left">
            {" "}
            <>
              {siteAssessment.map((desc) => (
                <li key={desc.description} className="flex items-start gap-3">
                  {" "}
                  <BadgeCheckIcon className="text-secondary flex-shrink-0 rounded-full" />
                  <span>{desc.description}</span>
                </li>
              ))}
            </>{" "}
          </ul>
        </div>
      </Fade>
    </>
  );
};

export default Security;
