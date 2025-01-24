import type React from "react"
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"

type TemplateProps = {
  data: {
    name: string
    title: string
    bio: string
    email: string
    phone: string
    skills: string
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

const MinimalistTemplate: React.FC<TemplateProps> = ({ data, colorScheme }) => {
  const skills = data.skills.split(",").map((skill) => skill.trim())

  return (
    <div
      className={`font-sans min-h-screen ${colorScheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <header
        className={`relative ${data.coverImage ? "h-96" : "py-16"} text-center ${colorScheme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        {data.coverImage ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.coverImage})` }}>
            <div className={`absolute inset-0 ${colorScheme === "dark" ? "bg-black" : "bg-white"} opacity-50`}></div>
          </div>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-r ${colorScheme === "dark" ? "from-blue-900 to-purple-900" : "from-blue-100 to-purple-100"}`}
          ></div>
        )}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
          {data.profileImage && (
            <img
              src={data.profileImage || "/placeholder.svg"}
              alt={data.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
            />
          )}
          <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
          <h2 className="text-2xl">{data.title}</h2>
        </div>
      </header>
      <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4">
          <ul className="flex justify-center space-x-6 py-4">
            <li>
              <a href="#about" className="hover:text-blue-500 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-blue-500 transition-colors">
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-blue-500 transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-500 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <section id="about" className="mb-16 fade-in">
          <h3 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">About Me</h3>
          <p className="text-lg leading-relaxed">{data.bio}</p>
        </section>
        <section id="skills" className="mb-16 fade-in">
          <h3 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Skills</h3>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2 transition-transform hover:scale-105"
              >
                <span className="text-xl mr-2" role="img" aria-label={skill}>
                  {getSkillEmoji(skill)}
                </span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
        <section id="projects" className="mb-16 fade-in">
          <h3 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-2">{project.name}</h4>
                  <p className="mb-4 text-sm">{project.description}</p>
                  <a
                    href={project.link}
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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
        <section id="contact" className="mb-16 fade-in">
          <h3 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {data.email}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Phone:</span> {data.phone}
              </p>
            </div>
            <div className="flex space-x-4 justify-start md:justify-end">
              {data.socialLinks.linkedin && (
                <a
                  href={data.socialLinks.linkedin}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {data.socialLinks.github && (
                <a
                  href={data.socialLinks.github}
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {data.socialLinks.twitter && (
                <a
                  href={data.socialLinks.twitter}
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={24} />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        © {new Date().getFullYear()} {data.name}. All rights reserved.
      </footer>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
                });
              });
            });

            // Intersection Observer for fade-in effect
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('fade-in-visible');
                }
              });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in').forEach((section) => {
              observer.observe(section);
            });
          `,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .fade-in {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.5s ease-out, transform 0.5s ease-out;
            }
            .fade-in-visible {
              opacity: 1;
              transform: translateY(0);
            }
          `,
        }}
      />
    </div>
  )
}

function getSkillEmoji(skill: string): string {
  const skillEmojiMap: { [key: string]: string } = {
    javascript: "🟨",
    python: "🐍",
    react: "⚛️",
    "node.js": "🟩",
    html: "🌐",
    css: "🎨",
    typescript: "🔷",
    java: "☕",
    "c++": "🔧",
    php: "🐘",
    ruby: "💎",
    swift: "🍎",
    go: "🐹",
    rust: "🦀",
    sql: "🗃️",
    mongodb: "🍃",
    docker: "🐳",
    kubernetes: "☸️",
    aws: "☁️",
    git: "🔀",
    linux: "🐧",
    "machine learning": "🤖",
    "data science": "📊",
    "ui/ux design": "🎭",
    agile: "🔄",
    devops: "🔁",
  }

  return skillEmojiMap[skill.toLowerCase()] || "💻"
}

export default MinimalistTemplate

