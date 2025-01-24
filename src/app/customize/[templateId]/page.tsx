"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomizationForm from "@/components/CustomizationForm";
import LivePreview from "@/components/LivePreview";
import React from "react";

export default function CustomizePage({ params }: { params: Promise<{ templateId: string }> }) {
  const router = useRouter();
  const { templateId } = React.use(params); // Unwrapping params here

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
    projects: [],
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
    },
    colorScheme: "light",
    font: "sans",
    profileImage: null,
    coverImage: null,
  });

  const handleFormChange = (newData: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleSubmit = () => {
    // In a real app, you'd process the form data here
    // For now, we'll just navigate to a preview page
    router.push(`/preview/${templateId}?data=${encodeURIComponent(JSON.stringify(formData))}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Customize Your Portfolio</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CustomizationForm formData={formData} onChange={handleFormChange} onSubmit={handleSubmit} />
        </div>
        <div className="sticky top-8 self-start">
          <LivePreview templateId={templateId} data={formData} />
        </div>
      </div>
    </div>
  );
}
