import clsx from "clsx";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { FaUsers, FaFileInvoice } from "react-icons/fa";
import { MdTimeline } from "react-icons/md";
import { NavLink } from "react-router-dom";

const classNamesForLink = `
  text-gray-300 hover:bg-green-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md
`

type SideNavigationItem = {
    name: string;
    to: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  };
  
  const SideNavigation = () => {
    const navigation = [
      { name: 'Projects', to: '/project', icon: AiOutlineFundProjectionScreen },
      { name: 'Project Timeline', to: '/project-timeline', icon: MdTimeline },
      { name: 'Clients', to: '/client', icon: FaUsers },
      { name: 'Invoices', to: '/invoice', icon: FaFileInvoice },
      { name: 'Prices', to: '/price', icon: BiMoney },

  
    ].filter(Boolean) as SideNavigationItem[];
  
    return (
      <>
        {navigation.map((item, index) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) => clsx(
              classNamesForLink ,
              (!isActive ? " unselected" : "bg-green-900 text-white")
            )
            }

          >
            <item.icon
              className={clsx(
                'bg-green-400group-hover:text-gray-300',
                'mr-4 flex-shrink-0 h-6 w-6'
              )}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </>
    );
  };

export default SideNavigation