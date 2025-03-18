"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Resume() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <article className="rounded-lg bg-white p-8 shadow-lg">
          <header className="mb-8 border-b pb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Cornelius Motanya
            </h1>
            <p className="text-xl text-gray-600">Web Developer</p>
          </header>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Professional Summary
            </h2>
            <p className="text-gray-700">
              Passionate web developer with expertise in building modern,
              responsive web applications using React, Next.js, and TypeScript.
              Focused on creating exceptional user experiences through clean,
              maintainable code and innovative solutions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Frontend</h3>
                <ul className="list-inside list-disc text-gray-700">
                  <li>React.js</li>
                  <li>Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Backend</h3>
                <ul className="list-inside list-disc text-gray-700">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>PostgreSQL</li>
                  <li>REST APIs</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Tools</h3>
                <ul className="list-inside list-disc text-gray-700">
                  <li>Git</li>
                  <li>VS Code</li>
                  <li>Docker</li>
                  <li>Figma</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Experience
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900">
                  Senior Web Developer
                </h3>
                <p className="text-gray-600">TechCorp Inc. • 2020 - Present</p>
                <ul className="mt-2 list-inside list-disc text-gray-700">
                  <li>
                    Led development of multiple client-facing web applications
                  </li>
                  <li>
                    Implemented responsive designs and optimized performance
                  </li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900">
                  Web Developer
                </h3>
                <p className="text-gray-600">
                  Digital Solutions Ltd • 2018 - 2020
                </p>
                <ul className="mt-2 list-inside list-disc text-gray-700">
                  <li>Developed and maintained client websites</li>
                  <li>Collaborated with design team on UI/UX improvements</li>
                  <li>Integrated third-party APIs and services</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Education
            </h2>
            <div>
              <h3 className="text-xl font-medium text-gray-900">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-gray-600">
                University of Technology • 2014 - 2018
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
