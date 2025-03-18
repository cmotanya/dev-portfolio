"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Resume() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <button
        onClick={handleClick}
        className="bg-primary outline-primary/60 text-background/80 -mt-16 flex items-center gap-2 rounded-full px-2.5 py-1.5 outline-offset-2 transition-all ease-in-out active:outline-2"
      >
        {" "}
        <ArrowLeft size={14} /> <span className="text-sm">Go Back</span>
      </button>

      {/* Work Experience */}
      <div className="mt-8">
        <h2 className="text-primary border-primary/20 mb-3 border-b pb-1 text-xl font-bold">
          WORK EXPERIENCE
        </h2>

        {/* Sales Associate */}
        <div className="mb-6">
          <div className="flex justify-between">
            <h3 className="font-semibold">Sales Associate</h3>
            <span className="text-textColor/70">01/2019 - 04/2020</span>
          </div>
          <p className="text-textColor/80">Ken Computers, Mombasa</p>
          <p className="text-textColor/80 mt-2">
            During my tenure as a Sales Associate at Ken Computers, I played a
            pivotal role in driving sales and contributing to the overall
            success of the business. Here are key aspects of my experience:
          </p>

          <div className="mt-3">
            <h4 className="font-medium">Exceeding Sales Targets:</h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Demonstrated a proactive and results-driven approach by
                consistently exceeding individual sales targets.
              </li>
              <li>
                Implemented effective sales strategies and techniques to
                maximize revenue, contributing to the financial success of the
                organization.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">Customer-Centric Approach:</h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Conducted product demonstrations for customers, providing
                insightful and informative sessions to showcase the features and
                benefits of various computer and CCTV products.
              </li>
              <li>
                Built strong relationships with customers by addressing
                inquiries related to computer hardware, software, and CCTV
                systems, leading to increased customer confidence and purchase
                decisions.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">
              Inventory Management and Stock Replenishment:
            </h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Played a crucial role in maintaining an organized inventory
                system, contributing to a 10% reduction in stock discrepancies.
              </li>
              <li>
                Ensured product availability for customers by actively
                participating in inventory management and stock replenishment
                processes.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">Positive Customer Feedback:</h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Received positive customer feedback, acknowledging exceptional
                customer service and satisfaction.
              </li>
              <li>
                Established a reputation for reliability and professionalism,
                enhancing the overall customer experience.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">
              Collaboration and Team Contribution:
            </h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Worked collaboratively with team members to achieve collective
                sales goals.
              </li>
              <li>
                Participated in team meetings and contributed insights to
                enhance sales strategies and improve customer engagement.
              </li>
            </ul>
          </div>
        </div>

        {/* Freelance Experience */}
        <div>
          <div className="flex justify-between">
            <h3 className="font-semibold">Freelance Experience</h3>
            <span className="text-textColor/70">2020 - Present</span>
          </div>
          <p className="text-textColor/80">
            Self-Employed, Mombasa and throughout Kenya
          </p>
          <p className="text-textColor/80 mt-2">
            During my tenure as a Freelance CCTV and Network Technician, I have
            actively engaged in a wide range of projects, specializing in
            computer installations and network configurations. My work has
            extended to clients across Mombasa and various regions of Kenya, and
            I have gained extensive experience in the following key areas:
          </p>

          <div className="mt-3">
            <h4 className="font-medium">CCTV Installations:</h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Successfully completed over 40 CCTV installations for numerous
                residential and commercial clients.
              </li>
              <li>
                Designed and implemented systems that include configuring camera
                setups, intricate wiring, and software configuration.
              </li>
              <li>
                Tailored solutions to meet specific security needs, enhancing
                surveillance capabilities for clients.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">
              Biometric and Access Control Specialist:
            </h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Installed and configured biometric time attendance systems for
                efficient workforce management.
              </li>
              <li>
                Expertise in access control solutions, ensuring secure and
                seamless entry to authorized personnel.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">Network Setup and Troubleshooting:</h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Provided comprehensive network setup services for schools and
                small office businesses with varying requirements.
              </li>
              <li>
                Conducted troubleshooting and issue resolution for both wired
                and wireless networks, consistently delivering optimal
                performance.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">
              Computer Hardware and Software Repairs:
            </h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Conducted numerous computer hardware and software repairs for
                individual customers.
              </li>
              <li>
                Diagnosed and resolved hardware malfunctions, system
                optimizations, and software installations promptly and
                effectively.
              </li>
              <li>
                Ensured client satisfaction by addressing a wide range of
                computer-related issues, from hardware failures to software
                glitches.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">
              Client Relationships and Project Management:
            </h4>
            <ul className="text-textColor/80 mt-1 ml-5 list-disc">
              <li>
                Managed client relationships with a focus on professionalism,
                communication, and understanding client needs.
              </li>
              <li>
                Handled project scheduling and billing, ensuring timely and
                efficient service delivery.
              </li>
              <li>
                Developed lasting client partnerships through a commitment to
                quality service and attention to detail.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
