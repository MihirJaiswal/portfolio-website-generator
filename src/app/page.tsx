import Link from "next/link"
import Image from "next/image"

const templates = [
  { id: "minimalist", name: "Minimalist", image: "/minimalist-template.jpg" },
  { id: "creative", name: "Creative", image: "/creative-template.jpg" },
  { id: "professional", name: "Professional", image: "/professional-template.jpg" },
]

export default function Home() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Choose Your Portfolio Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Link href={`/customize/${template.id}`} key={template.id} className="block group">
            <div className="border rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
              <div className="relative h-64">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold text-center">{template.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

