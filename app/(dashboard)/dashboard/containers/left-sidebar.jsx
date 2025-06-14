"use client";

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import Link from 'next/link';
import SidebarSubmenu from './sidebar-submenu';
import routes from '../helper/sidebar-routes';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { setPageTitle } from '../features/common/headerSlice';
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon';
import { getUserInfo } from '../features/common/userSlice';
import { UserIcon } from '@heroicons/react/24/outline';
import { APP_NAME } from '../helper/app-constants';

function LeftSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const close = () => {
    const leftSidebarDrawer = document.getElementById('left-sidebar-drawer');
    if (leftSidebarDrawer) leftSidebarDrawer.click();
  };

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(pathname);
    let routeObj = routes.filter((r) => r.path === pathname)[0];
    if (routeObj) {
      dispatch(setPageTitle({ title: routeObj.pageTitle }));
    } else {
      const secondSlashIndex = pathname.indexOf('/', pathname.indexOf('/') + 1);
      if (secondSlashIndex !== -1) {
        const substringBeforeSecondSlash = pathname.substring(0, secondSlashIndex);
        let submenuRouteObj = routes.filter((r) => r.path === substringBeforeSecondSlash)[0];
        if (submenuRouteObj?.submenu) {
          let submenuObj = submenuRouteObj.submenu.filter((r) => r.path === pathname)[0];
          console.log("herere", submenuObj);
          if (submenuObj) {
            dispatch(setPageTitle({ title: submenuObj.pageTitle }));
          }
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const logoutUser = async () => {
    
  };

  return (
    <div className="z-30 overflow-hidden drawer-side">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="min-h-full pt-2 menu w-80 bg-base-100 text-base-content">
        <button
          className="absolute top-0 right-0 z-50 mt-4 mr-2 btn btn-ghost bg-base-300 btn-circle lg:hidden"
          onClick={close}
        >
          <XMarkIcon className="inline-block w-5 h-5" />
        </button>

        <li className="mb-2 text-xl font-semibold">
          <Link href="/dashboard">
            <img className="w-10 mask mask-squircle" src="/Logo.png" alt="DashWind Logo" />
            {APP_NAME}
          </Link>
        </li>

        <div className="pb-20 overflow-y-scroll no-scrollbar" style={{ height: "85vh" }}>
          {routes.map((route, index) => (
            <li className="" key={index}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <Link
                  href={route.path}
                  className={`${
                    pathname === route.path ? 'font-semibold bg-base-200 ' : 'font-normal'
                  }`}
                >
                  {route.icon} {route.pageName}
                  {pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </Link>
              )}
            </li>
          ))}
        </div>
      </ul>

      <div className="absolute bottom-0 dropdown dropdown-top w-80">
        <div tabIndex={0} role="button" className="justify-start w-full text-left btn bg-base-100">
          <div className="avatar">
            <div className="w-6 rounded-full">
              <img src="/women-2.png" />
            </div>
          </div>
          {user.name}
          <ChevronUpIcon className="w-4" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content visible w-52 px-4 z-[1] menu shadow bg-base-200 rounded-box"
        >
          <li>
            <Link href="/settings/profile">
              <UserIcon className="w-4" />
              Profile
            </Link>
          </li>
          <div className="py-2 m-0 divider"></div>
          <li onClick={() => logoutUser()}>
            <a>
              <ArrowUpOnSquareIcon className="w-4" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
