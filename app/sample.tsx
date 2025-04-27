"use client";

import React, { useState } from "react";
import { DollarSign, Shield, Globe, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const Pricing: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"security" | "web">("security");

  interface SolutionOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }

  const securityOptions: SolutionOption[] = [
    {
      id: "residential",
      title: "Residential Security",
      description:
        "Protect your home with customized security solutions designed for peace of mind and family safety.",
      icon: <Shield size={24} />,
    },
    {
      id: "small-business",
      title: "Small Business",
      description:
        "Affordable security systems for retail shops, offices, and small commercial establishments.",
      icon: <Shield size={24} />,
    },
    {
      id: "enterprise",
      title: "Enterprise Solutions",
      description:
        "Comprehensive security infrastructure for larger facilities, warehouses, and multi-location businesses.",
      icon: <Shield size={24} />,
    },
  ];

  const webOptions: SolutionOption[] = [
    {
      id: "informational",
      title: "Informational Website",
      description:
        "Professional website to showcase your business with essential information and contact details.",
      icon: <Globe size={24} />,
    },
    {
      id: "business",
      title: "Interactive Business Site",
      description:
        "Dynamic website with content management, forms, and interactive elements for user engagement.",
      icon: <Globe size={24} />,
    },
    {
      id: "ecommerce",
      title: "E-Commerce Platform",
      description:
        "Complete online store with product catalog, secure payment processing, and inventory management.",
      icon: <Globe size={24} />,
    },
  ];

  return (
    <section
      id="solutions"
      className="mx-auto max-w-6xl bg-gray-50 px-4 py-16 md:px-12 md:py-24"
    >
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold">
          <span className="text-primary">Tailored Solutions</span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          We don't believe in one-size-fits-all pricing. Each project is unique
          and deserves a customized approach and personalized quote.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-lg bg-gray-200 p-1">
          <button
            onClick={() => setActiveTab("security")}
            className={`rounded-md px-4 py-2 ${activeTab === "security" ? "bg-white shadow-sm" : ""}`}
          >
            Security Systems
          </button>
          <button
            onClick={() => setActiveTab("web")}
            className={`rounded-md px-4 py-2 ${activeTab === "web" ? "bg-white shadow-sm" : ""}`}
          >
            Web Development
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
        {activeTab === "security" ? (
          <>
            <h2 className="mb-6 text-2xl font-bold">
              Security System Solutions
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {securityOptions.map((option) => (
                <div
                  key={option.id}
                  className="hover:border-primary rounded-lg border border-gray-200 p-6 transition-colors"
                >
                  <div className="text-secondary mb-4">{option.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{option.title}</h3>
                  <p className="mb-6 text-gray-600">{option.description}</p>
                  <button
                    onClick={() =>
                      router.push(`/contact?service=security&type=${option.id}`)
                    }
                    className="text-primary flex items-center font-medium"
                  >
                    Request Quote <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold">Our Security Process</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Site Assessment</h4>
                    <p className="text-sm text-gray-600">
                      Free on-site evaluation to understand your security needs
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Custom Design</h4>
                    <p className="text-sm text-gray-600">
                      Tailored security solution based on your requirements
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Professional Installation</h4>
                    <p className="text-sm text-gray-600">
                      Expert setup and training on your new system
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-bold">
              Web Development Solutions
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {webOptions.map((option) => (
                <div
                  key={option.id}
                  className="hover:border-primary rounded-lg border border-gray-200 p-6 transition-colors"
                >
                  <div className="text-secondary mb-4">{option.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{option.title}</h3>
                  <p className="mb-6 text-gray-600">{option.description}</p>
                  <button
                    onClick={() =>
                      router.push(`/contact?service=web&type=${option.id}`)
                    }
                    className="text-primary flex items-center font-medium"
                  >
                    Request Quote <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold">
                Our Development Process
              </h3>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Discovery</h4>
                    <p className="text-sm text-gray-600">
                      Understanding your business and goals
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Design</h4>
                    <p className="text-sm text-gray-600">
                      Creating mockups and wireframes
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Development</h4>
                    <p className="text-sm text-gray-600">
                      Building your custom solution
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Launch</h4>
                    <p className="text-sm text-gray-600">
                      Going live with ongoing support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            Looking for something specific? We create custom solutions for
            unique needs.
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="bg-primary rounded-lg px-8 py-3 font-medium text-white"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
