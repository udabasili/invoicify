import React from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { Client } from "../types";
import { ImBin } from "react-icons/im";
import { DeleteClient } from "./DeleteClient";
import { UpdateClient } from "./UpdateClient";
import Modal from "@/components/Modal/Modal";
import useDisclosure from "@/hooks/useDisclosure";
import clsx from "clsx";


export const ClientItem = (props: Client) => {
  const { name, email, address, city, country, userId } = props;
  const { close, open, isOpen } = useDisclosure();

  return (
    <tr className=" flex mb-3 flex-col lg:table-row odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ">
      <td className="py-3 px-6 text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </td>
      <td className="py-3 px-6 text-xs font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">
        {email}
      </td>
      <td className="py-3 px-6 text-xs font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">
        {city} , {country}
      </td>
      <td className="py-3 flex justify-between px-6 text-xs font-medium tracking-wider text-gray-500 whitespace-nowrap dark:text-gray-400">
        <span title="View">
          <AiFillEye
            fontSize="1rem"
            color="white"
            cursor="pointer"
            onClick={open}
          />
        </span>
        <span title="Edit">
          <UpdateClient
            clientData={props}
            TriggerButton={
              <AiFillEdit fontSize="1rem" color="white" cursor="pointer" />
            }
          />
        </span>
        <span title="Delete">
          <DeleteClient
            id={userId}
            triggerButton={
              <ImBin fontSize="1rem" color="red" cursor="pointer" />
            }
          />
        </span>
        {isOpen && (
          <Modal closeHandler={close} title={" Client"} size="md">
            <div
              className={clsx("block text-sm font-medium text-gray-700 mb-4")}
            >
              <span className={clsx("block text-sm text-black font-bold")}>
                Name:
                <div className="mt-1">
                  <span
                    className={clsx(
                      "appearance-none  font-medium  block w-full px-3 py-2u sm:text-sm"
                    )}
                  >
                    {name}
                  </span>
                </div>
              </span>
            </div>
            <div
              className={clsx("block text-sm font-medium text-gray-700 mb-4")}
            >
              <span className={clsx("block text-sm text-black font-bold ")}>
                Email:
                <div className="mt-1">
                  <span
                    className={clsx(
                      "appearance-none  font-medium  block w-full px-3 py-2 sm:text-sm"
                    )}
                  >
                    {email}
                  </span>
                </div>
              </span>
            </div>
            <div
              className={clsx("block text-sm font-medium text-gray-700 mb-4")}
            >
              <span className={clsx("block text-sm text-black font-bold ")}>
                Address:
                <div className="mt-1">
                  <span
                    className={clsx(
                      "appearance-none  font-medium  block w-full px-3 py-2 sm:text-sm"
                    )}
                  >
                    {address}, {city}, {country}
                  </span>
                </div>
              </span>
            </div>
          </Modal>
        )}
      </td>
    </tr>
  );
};
