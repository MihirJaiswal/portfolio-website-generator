"use client"

import { useState, useEffect } from "react"
import MinimalistTemplate from "./templates/MinimalistTemplate"
import CreativeTemplate from "./templates/CreativeTemplate"
import ProfessionalTemplate from "./templates/ProfessionalTemplate"

type Props = {
  templateId: string
  data: any
}

export default function LivePreview({ templateId, data }: Props) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const renderTemplate = () => {
    switch (templateId) {
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

  if (!isMounted) {
    return null // or a loading spinner
  }

  return (
    <div className="border rounded-lg p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Live Preview</h2>
      <div className="border rounded-lg overflow-hidden">
        <div className="w-full h-[600px] overflow-auto">{renderTemplate()}</div>
      </div>
    </div>
  )
}

