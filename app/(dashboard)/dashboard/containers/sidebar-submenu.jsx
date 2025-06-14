import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function SidebarSubmenu(props) {
    const { submenu, pageName, icon } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const pathname = usePathname();

    // Buka submenu jika path cocok saat pertama kali dimuat
    useEffect(() => {
        if (submenu && submenu.some(m => m.path === pathname)) {
            setIsExpanded(true);
        }
    }, [submenu, pathname]);

    return (
        <div className="flex flex-col hover:bg-base-100 bg-base-100">
            {/* Header route */}
            <div className="block w-full cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                {icon} {pageName}
                <ChevronDownIcon
                    className={`w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all ${
                        isExpanded ? 'rotate-180' : ''
                    }`}
                />
            </div>

            {/* Daftar submenu */}
            <div className={`w-full ${isExpanded ? '' : 'hidden'}`}>
                <ul className="menu menu-compact">
                    {submenu && submenu.map((m, k) => (
                        <li key={k}>
                            <Link href={m.path} className={`${pathname === m.path ? "font-semibold bg-base-200" : ""}`}>
                                {m.icon} {m.pageName}
                                {pathname === m.path && (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 mt-1 mb-1 rounded-tr-md rounded-br-md bg-primary"
                                        aria-hidden="true"
                                    ></span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SidebarSubmenu;
