import React from "react"
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"

type TemplateProps = {
  data: {
    name: string
    title: string
    bio: string
    email: string
    phone: string
    experience: string
    projects: Array<{
      name: string
      description: string
      link: string
      image: string
    }>
    socialLinks: {
      linkedin?: string
      github?: string
      twitter?: string
    }
    profileImage: string | null
    coverImage: string | null
  }
  colorScheme: "light" | "dark"
}

export default function ProfessionalTemplate({ data, colorScheme }: TemplateProps) {
  return (
    <div className={`font-sans ${colorScheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <header className="relative bg-blue-600 text-white">
        {data.coverImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${data.coverImage})` }}
          ></div>
        )}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            {data.profileImage && (
              <img
                src={data.profileImage || "/placeholder.svg"}
                alt={data.name}
                className="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-lg object-cover"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold">{data.name}</h1>
              <h2 className="text-xl">{data.title}</h2>
            </div>
          </div>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:underline">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:underline">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-16">
        <section id="about" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">About Me</h3>
          <p className="text-lg leading-relaxed">{data.bio}</p>
        </section>
        <section id="experience" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">Experience</h3>
          <div className="space-y-8">
            {data.experience.split("\n").map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <h4 className="text-xl font-semibold">{exp.split(" - ")[0]}</h4>
                <p className="text-gray-600 dark:text-gray-400">{exp.split(" - ")[1]}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="projects" className="mb-16">
          <h3 className="text-3xl font-bold mb-8">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{project.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="contact">
          <h3 className="text-3xl font-bold mb-4">Contact</h3>
          <p className="mb-2">
            Email:{" "}
            <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">
              {data.email}
            </a>
          </p>
          <p className="mb-4">Phone: {data.phone}</p>
          <div className="flex space-x-4">
            {data.socialLinks.linkedin && (
              <a
                href={data.socialLinks.linkedin}
                className="text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            )}
            {data.socialLinks.github && (
              <a
                href={data.socialLinks.github}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
            )}
            {data.socialLinks.twitter && (
              <a
                href={data.socialLinks.twitter}
                className="text-blue-400 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
            )}
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-8 text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} {data.name}. All rights reserved.
      </footer>
    </div>
  )
}

