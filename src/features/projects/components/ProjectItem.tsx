import Modal from "@/components/Modal/Modal";
import useDisclosure from "@/hooks/useDisclosure";
import clsx from "clsx";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { useUpdateProject } from "../api/updateProject";
import { Project } from "../types";
import { DeleteProject } from "./DeleteProject";
import { UpdateProject } from "./UpdateProject";

export const ProjectItem = (props: Project) => {
  const { projectId, projectName, status, dueDate, summary } = props;
  const { close, open, isOpen } = useDisclosure();
  const { updateProjectFn } = useUpdateProject();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let checked: "completed" | "ongoing" = e.target.checked
      ? "completed"
      : "ongoing";
    await updateProjectFn({
      projectId,
      projectName,
      status: checked,
    });
  };

  return (
    <tr className=" flex mb-3 flex-col lg:table-row odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ">
      <td className="py-3 px-6 text-xs font-medium  tracking-wider text-left dark:text-white ">
        <input
          type="checkbox"
          checked={status === "completed"}
          onChange={handleChange}
        />
      </td>
      <td className="py-3 px-6 text-xs  font-medium   tracking-wider text-left dark:text-white">
        {projectName}
      </td>
      <td
        className={`py-3 px-6 text-xs  font-medium   tracking-wider ${
          status === "ongoing" ? "text-orange-700" : "text-green-600"
        } whitespace-nowrap`}
      >
        {status}
      </td>
      <td className="py-3 px-6 text-xs  font-medium   tracking-wider text-gray-500 whitespace-nowrap dark:text-gray-400">
        $200
      </td>
      <td className="py-3 px-6 text-xs  font-medium   tracking-wider text-gray-500 whitespace-nowrap dark:text-gray-400">
        {new Date(dueDate as Date).toDateString()}
      </td>
      <td className="py-3 flex justify-around px-6 text-xs font-medium tracking-wider text-gray-500 whitespace-nowrap dark:text-gray-400">
        <span title="View">
          <AiFillEye
            fontSize=".95rem"
            color="white"
            cursor="pointer"
            onClick={open}
          />
        </span>
        <UpdateProject
          projectData={props}
          TriggerButton={
            <AiFillEdit
              color="white"
              cursor="pointer"
              fontSize=".95rem"
              style={{ lineHeight: "1rem" }}
            />
          }
        />
        <span title="Delete">
          <DeleteProject
            id={projectId}
            triggerButton={
              <ImBin color="red" cursor="pointer" fontSize=".95rem" />
            }
          />
        </span>
      </td>
      {isOpen && (
        <Modal closeHandler={close} title={" Project Info"} size="lg">
          <div
            className={clsx(
              "block text-xs font-medium tracking-wider text-gray-700 mb-4"
            )}
          >
            <span
              className={clsx(
                "block text-xs tracking-wider text-black font-bold"
              )}
            >
              Project Title:
              <div className="mt-1">
                <span
                  className={clsx(
                    "appearance-none  font-medium  block w-full px-3 py-2u sm:text-sm"
                  )}
                >
                  {projectName}
                </span>
              </div>
            </span>
          </div>
          <div
            className={clsx(
              "block text-xs font-medium tracking-wider text-gray-700 mb-4"
            )}
          >
            <span
              className={clsx(
                "block text-xs font-medium tracking-wider text-black"
              )}
            >
              Summary:
              <div className="mt-1">
                <span
                  className={clsx(
                    "appearance-none  font-medium  block w-full px-3 py-2 sm:text-sm"
                  )}
                >
                  {summary}
                </span>
              </div>
            </span>
          </div>
          <div
            className={clsx(
              "block text-xs tracking-wider font-medium text-gray-700 mb-4"
            )}
          >
            <span
              className={clsx(
                "block text-xs tracking-wider text-black font-bold "
              )}
            >
              Due Date:
              <div className="mt-1">
                <span
                  className={clsx(
                    "appearance-none  font-medium  block w-full px-3 py-2 sm:text-sm"
                  )}
                >
                  {new Date(dueDate as Date).toDateString()}
                </span>
              </div>
            </span>
          </div>
        </Modal>
      )}
    </tr>
  );
};
