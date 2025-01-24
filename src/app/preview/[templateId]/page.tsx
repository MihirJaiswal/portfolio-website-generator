"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const MinimalistTemplate = dynamic(() => import("@/components/templates/MinimalistTemplate"), { ssr: false })
const CreativeTemplate = dynamic(() => import("@/components/templates/CreativeTemplate"), { ssr: false })
const ProfessionalTemplate = dynamic(() => import("@/components/templates/ProfessionalTemplate"), { ssr: false })

export default function PreviewPage({ params }: { params: { templateId: string } }) {
  const searchParams = useSearchParams()
  const [html, setHtml] = useState("")

  useEffect(() => {
    const generateHtml = async () => {
      const data = JSON.parse(decodeURIComponent(searchParams.get("data") || "{}"))

      const renderTemplate = () => {
        switch (params.templateId) {
          case "minimalist":
            return <MinimalistTemplate data={data} colorScheme={data.colorScheme} />
          case "creative":
            return <CreativeTemplate data={data} colorScheme={data.colorScheme} />
          case "professional":
            return <ProfessionalTemplate data={data} colorScheme={data.colorScheme} />
          default:
            return <div>Invalid template selected</div>
        }
      }

      const templateComponent = renderTemplate()

      // Use a temporary container to render the component
      const tempContainer = document.createElement("div")
      const { createRoot } = await import("react-dom/client")
      const root = createRoot(tempContainer)

      await new Promise<void>((resolve) => {
        root.render(<div id="portfolio-content">{templateComponent}</div>)
        setTimeout(resolve, 100) // Give React time to render
      })

      const generatedHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.name} - Portfolio</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
          <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/react-icons@4.8.0/lib/esm/index.js" type="module"></script>
          <style>
            body {
              font-family: 'Inter', sans-serif;
            }
            ${tempContainer.querySelector("style")?.innerHTML || ""}
          </style>
        </head>
        <body>
          ${tempContainer.innerHTML}
          <script>
            // Rerun Tailwind when the page loads
            document.addEventListener('DOMContentLoaded', (event) => {
              if (window.tailwind) {
                window.tailwind.refresh()
              }
            })
            ${tempContainer.querySelector("script")?.innerHTML || ""}
          </script>
        </body>
        </html>
      `
      setHtml(generatedHtml)
    }

    generateHtml()
  }, [searchParams, params.templateId])

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([html], { type: "text/html" })
    element.href = URL.createObjectURL(file)
    element.download = "portfolio.html"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Preview Your Portfolio</h2>
      <div className="mb-4">
        <button onClick={handleDownload} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Download HTML
        </button>
      </div>
      <div className="border rounded-lg p-4">
        <iframe srcDoc={html} title="Portfolio Preview" className="w-full h-[600px] border-0" />
      </div>
    </div>
  )
}

