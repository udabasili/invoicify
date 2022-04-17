export type ProjectProps = {
    setCurrentState: (e: 'form'|'list' ) => void
}

export interface ProjectDTO {
  projectName: string
  summary: string
  status?: 'ongoing' | 'completed'
  dueDate?: Date
}


export interface Project extends ProjectDTO {
  projectId: string
  createdAt: Date
  updatedAt: Date
  invoiceId: string
  clientId: string
}