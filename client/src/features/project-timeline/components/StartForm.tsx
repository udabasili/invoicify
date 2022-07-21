import Button from '@/components/Elements/Button/Button'
import { Project } from '@/features/projects/types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type StartFormProps = {
  setFormState: (e: 'gantt'|'startForm') => void
  setProjectId: (e: string) => void
  projectId: string
  projectList: Project[]
}

export const StartForm = ({setFormState, setProjectId, projectList, projectId }: StartFormProps) => {

  const navigate = useNavigate()
  function handleSubmit () {
    if (!projectId) {
      toast.error('You must select a project')
      return
    }
    setFormState('gantt')

  }

  return (
      <div className="grid grid-cols-2 md:col-start-3 md:col-end-5">
        <select
          name="projectId"
          className="col-start-1 col-end-2  mr-3 w-auto py-2 px-1  my-2"
          defaultValue=""
          value={projectId}
          onChange={(e) => setProjectId(e.target.value) }
        >
          <option value="" disabled >Choose the Project </option>
          {projectList.map((project) => (
            <option
              key={project.projectId}
              value={project.projectId}
              className="p-4"

            >
              {project.projectName}
            </option>
          ))}
        </select>
        <Button
          type="button"
          variant="dark"
          onClick={() => navigate('/project')}
          size="sm"
          className="justify-self-start  col-start-2 col-end-3 ml-6"
        >
          Add Project
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleSubmit}
          className="justify-self-start  col-start-1 col-end-3 mt-20"
        >
          Submit
        </Button>
      </div>
  )
}
