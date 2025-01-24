import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Project = {
  name: string
  description: string
  link: string
  image: string
}

type FormData = {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  skills: string
  experience: string
  education: string
  projects: Project[]
  socialLinks: {
    linkedin: string
    github: string
    twitter: string
  }
  colorScheme: string
  font: string
  profileImage: File | null
  coverImage: File | null
}

type Props = {
  formData: FormData
  onChange: (newData: Partial<FormData>) => void
  onSubmit: () => void
}

export default function CustomizationForm({ formData, onChange, onSubmit }: Props) {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectLink, setProjectLink] = useState("")
  const [projectImage, setProjectImage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({ [name]: value })
  }

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({ socialLinks: { ...formData.socialLinks, [name]: value } })
  }

  const handleAddProject = () => {
    if (projectName && projectDescription) {
      onChange({
        projects: [
          ...formData.projects,
          { name: projectName, description: projectDescription, link: projectLink, image: projectImage },
        ],
      })
      setProjectName("")
      setProjectDescription("")
      setProjectLink("")
      setProjectImage("")
    }
  }

  const onProfileImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange({ profileImage: acceptedFiles[0] })
    },
    [onChange],
  )

  const onCoverImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange({ coverImage: acceptedFiles[0] })
    },
    [onChange],
  )

  const { getRootProps: getProfileImageRootProps, getInputProps: getProfileImageInputProps } = useDropzone({
    onDrop: onProfileImageDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  })

  const { getRootProps: getCoverImageRootProps, getInputProps: getCoverImageInputProps } = useDropzone({
    onDrop: onCoverImageDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Your professional title"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="A brief description about yourself"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills & Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Your work experience"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Your educational background"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.projects.map((project, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h4 className="font-semibold">{project.name}</h4>
                <p className="text-sm text-gray-600">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Project
                </a>
                {project.image && (
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="mt-2 w-full h-32 object-cover rounded-md"
                  />
                )}
              </CardContent>
            </Card>
          ))}
          <div className="space-y-2">
            <Input placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            <Textarea
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            <Input
              type="url"
              placeholder="Project Link"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
            <Input
              type="url"
              placeholder="Project Image URL"
              value={projectImage}
              onChange={(e) => setProjectImage(e.target.value)}
            />
            <Button type="button" onClick={handleAddProject} variant="outline">
              Add Project
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleSocialLinkChange}
              placeholder="Your LinkedIn profile URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              type="url"
              id="github"
              name="github"
              value={formData.socialLinks.github}
              onChange={handleSocialLinkChange}
              placeholder="Your GitHub profile URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              type="url"
              id="twitter"
              name="twitter"
              value={formData.socialLinks.twitter}
              onChange={handleSocialLinkChange}
              placeholder="Your Twitter profile URL"
            />
          </div>
        </CardContent>
      </Card>

            <Card>
        <CardHeader>
            <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="colorScheme">Color Scheme</Label>
            <Select
                value={formData.colorScheme}
                onValueChange={(value) => onChange({ colorScheme: value })}
            >
                <SelectTrigger>
                <SelectValue placeholder="Select a color scheme" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>
            </div>
            <div className="space-y-2">
            <Label htmlFor="font">Font</Label>
            <Select
                value={formData.font}
                onValueChange={(value) => onChange({ font: value })}
            >
                <SelectTrigger>
                <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="sans">Sans-serif</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Profile Image</Label>
            <div
              {...getProfileImageRootProps()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 transition-colors"
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="profile-image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      {...getProfileImageInputProps()}
                      id="profile-image-upload"
                      name="profile-image-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <Label>Cover Image (Optional)</Label>
            <div
              {...getCoverImageRootProps()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 transition-colors"
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="cover-image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      {...getCoverImageInputProps()}
                      id="cover-image-upload"
                      name="cover-image-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Generate Portfolio
      </Button>
    </form>
  )
}


