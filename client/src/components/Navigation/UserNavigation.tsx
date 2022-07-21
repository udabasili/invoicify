import { useAuth } from "@/lib/auth";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

type UserNavigationItem = {
    name: string;
    to: string;
    onClick?: () => void;
  };
  
  const UserNavigation = () => {
    const { logoutFn } = useAuth();
    const userNavigation = [
    {
        name: "Sign out",
        to: "",
        onClick: () => {
          logoutFn();
        }
      },
    ].filter(Boolean) as UserNavigationItem[];
  
    return (
      <Menu as="div" className="ml-3 relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="max-w-xs  bg-green-200 p-2 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <HiUser className="h-8 w-8 rounded-full" />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        onClick={item.onClick}
                        to={item.to}
                        className={clsx(
                          active ? "bg-green-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    );
  };

export default UserNavigation ;