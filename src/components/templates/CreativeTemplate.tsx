import React from "react"
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"

type TemplateProps = {
  data: {
    name: string
    title: string
    bio: string
    email: string
    phone: string
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

export default function CreativeTemplate({ data, colorScheme }: TemplateProps) {
  return (
    <div className={`font-serif ${colorScheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <header className="relative py-24 text-center text-white">
        {data.coverImage ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.coverImage})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
        )}
        <div className="relative z-10">
          {data.profileImage && (
            <img
              src={data.profileImage || "/placeholder.svg"}
              alt={data.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
            />
          )}
          <h1 className="text-6xl font-bold mb-4">{data.name}</h1>
          <h2 className="text-3xl">{data.title}</h2>
        </div>
      </header>
      <nav className="bg-gray-800 text-white py-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#about" className="hover:text-pink-500 transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-pink-500 transition-colors">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-pink-500 transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-16">
        <section id="about" className="mb-24">
          <h3 className="text-4xl font-bold mb-8 text-center">About Me</h3>
          <p className="text-xl leading-relaxed">{data.bio}</p>
        </section>
        <section id="projects" className="mb-24">
          <h3 className="text-4xl font-bold mb-12 text-center">My Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data.projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-white mb-2">{project.name}</h4>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <a
                      href={project.link}
                      className="inline-block bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="text-center">
          <h3 className="text-4xl font-bold mb-8">Get in Touch</h3>
          <p className="text-xl mb-4">Email: {data.email}</p>
          <p className="text-xl mb-8">Phone: {data.phone}</p>
          <div className="flex justify-center space-x-6">
            {data.socialLinks.linkedin && (
              <a
                href={data.socialLinks.linkedin}
                className="text-3xl hover:text-pink-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            )}
            {data.socialLinks.github && (
              <a
                href={data.socialLinks.github}
                className="text-3xl hover:text-pink-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            )}
            {data.socialLinks.twitter && (
              <a
                href={data.socialLinks.twitter}
                className="text-3xl hover:text-pink-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

