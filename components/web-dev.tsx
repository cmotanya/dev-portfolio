import { webOptions } from "@/app/data/about";
import { ArrowRight, BadgeCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fade } from "react-awesome-reveal";

const WebDev = () => {
  const router = useRouter();

  return (
    <>
      <Fade duration={300} cascade>
        <h2 className="text-primary mb-4 text-xl font-bold">
          Web Development Solutions
        </h2>

        <div>
          {webOptions.map((option) => (
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
            My Development Process
          </h3>{" "}
          <ul className="space-y-2 text-justify">
            {" "}
            <li className="flex items-start gap-3">
              {" "}
              <span className="text-secondary flex-shrink-0 rounded-full">
                {" "}
                <BadgeCheckIcon />
              </span>{" "}
              <span>Understanding your business and goals</span>{" "}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary flex-shrink-0 rounded-full">
                {" "}
                <BadgeCheckIcon />
              </span>{" "}
              <span>Creating mockups and wireframes</span>{" "}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary flex-shrink-0 rounded-full">
                {" "}
                <BadgeCheckIcon />
              </span>{" "}
              <span>Building your custom solution</span>{" "}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary flex-shrink-0 rounded-full">
                {" "}
                <BadgeCheckIcon />
              </span>{" "}
              <span>Going live with ongoing support</span>{" "}
            </li>
          </ul>
        </div>
      </Fade>
    </>
  );
};

export default WebDev;
// components/web-dev.tsx
