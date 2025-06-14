"use client";
import { themeChange } from 'theme-change';
import { useEffect, useState } from 'react';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { removeNotificationMessage } from '../features/common/headerSlice';
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../helper/app-constants';
import { toast } from 'react-toastify';

function Header({ contentRef }) {
  const {
    noOfNotifications,
    pageTitle,
    newNotificationMessage,
    newNotificationStatus,
  } = useAppSelector((state) => state.header);

  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus == 1) {
        toast.success(newNotificationMessage);
      } else {
        toast.error(newNotificationMessage);
      }
      dispatch(removeNotificationMessage());
    }
  }, [newNotificationMessage]);

  // Scroll to top on pageTitle change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pageTitle]);

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
  }, []);

  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
        extraObject: {},
      })
    );
  };

  return (
    <div className="sticky top-0 z-10 shadow-md navbar bg-base-100">
      <div className="flex-1">
        <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
          <Bars3Icon className="inline-block w-5 h-5" />
        </label>
        <h1 className="ml-2 text-2xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex-none">
        <label className="swap">
          <input type="checkbox" />
          <SunIcon
            data-set-theme="light"
            data-act-class="ACTIVECLASS"
            className={`fill-current w-6 h-6 ${currentTheme === "dark" ? "swap-on" : "swap-off"}`}
          />
          <MoonIcon
            data-set-theme="dark"
            data-act-class="ACTIVECLASS"
            className={`fill-current w-6 h-6 ${currentTheme === "light" ? "swap-on" : "swap-off"}`}
          />
        </label>

        <button className="ml-2 mr-4 btn btn-ghost btn-circle" onClick={openNotification}>
          <div className="indicator">
            <BellIcon className="w-6 h-6" />
            {noOfNotifications > 0 && (
              <span className="indicator-item badge badge-secondary badge-sm">
                {noOfNotifications}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;
