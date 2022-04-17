import * as React from "react";
import { Head } from "@/components/Head";
import Link from "@/components/Elements/Link/Link";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head title="Auth" />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link className="flex items-center text-white" to="/"></Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
