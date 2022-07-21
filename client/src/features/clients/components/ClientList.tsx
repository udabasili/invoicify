import { ClientListContainer } from "./client.styles";
import { IoMdAdd } from "react-icons/io";
import {
  CustomHeader,
  CustomProps,
} from "@/components/CustomHeader/CustomHeader";
import { useGetClients } from "../api/getClients";
import Loader from "@/components/Elements/Loaders/Loader";
import { Client } from "../types";
import { ClientItem } from "./ClientItem";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";

export const ClientsList = ({ setCurrentState }: CustomProps) => {
  const { data, isLoading, isError } = useGetClients<Client[]>();

  let component: JSX.Element = <></>;
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!data || data?.length === 0 || isError) {
    component = (
      <div
        role="list"
        aria-label="comments"
        className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col"
      >
        <GiEmptyMetalBucketHandle className="h-10 w-10" />
        <h4>No Clients Found</h4>
      </div>
    );
  }

  if (data?.length) {
    component = (
      <table className="w-full grid grid-cols-2 lg:bg-white rounded-lg overflow-hidden lg:shadow-lg my-5 lg:table">
        <thead className="col-start-1 col-end-2">
          {data?.map((item) => (
            <tr className="flex flex-col flex-no wrap lg:table-row bg-green-100 dark:bg-green-700 mb-3 ">
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
              >
                Name
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
              >
                Email
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
              >
                Location
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
              >
                Action
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="lg:contents col-start-2 col-end-3 flex-col">
          {data?.map((item: Client) => (
            <ClientItem key={item.userId} {...item} />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <ClientListContainer>
      <CustomHeader
        title="Client"
        startIcon={<IoMdAdd />}
        setCurrentState={setCurrentState}
        buttonText="Add Client"
        nextType="form"
      />
      {component}
    </ClientListContainer>
  );
};
