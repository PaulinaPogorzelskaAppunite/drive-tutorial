export type Folder = {
  id: string
  name: string
  type: "folder"
  parent: string | null
}
 
export type File = {
  id: string
  name: string
  type: "file"
  url: string
  parent: string
  size: string
}

export const mockFolders: Folder[] = [
  {id: "root", name: "Root", type: "folder", parent: null},
  { id: "1", name: "Documents", type: "folder", parent: "root"},
  { id: "2", name: "Images", type: "folder", parent: "root" },
  { id: "3", name: "Work", type: "folder", parent: "root" },
  { id: "4", name: "Downloads", type: "folder", parent: "3" },
]

export const mockFiles: File[] = [
  { id:"1", name: "Resume.pdf", type: "file", url: "/files/resume.pdf", parent: "1", size: "1.2 MB" },
  { id: "2", name: "Project Proposal.docx", type: "file", url: "/files/proposal.docx", parent: "1", size: "2.5 MB" },
  { id: "3", name: "Vacation.jpg", type: "file", url: "/files/vacation.jpg", parent: "2", size: "3.7 MB" },
  { id: "4", name: "Profile Picture.png", type: "file", url: "/files/profile.png", parent: "2", size: "1.8 MB" },
  { id: "5", name: "Presentations.jpg", type: "file", url: "/files/presentations.jpg", parent: "4", size: "1.8 MB" },
]
