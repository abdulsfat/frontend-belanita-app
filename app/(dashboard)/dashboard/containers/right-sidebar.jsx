import { XMarkIcon } from '@heroicons/react/24/solid'
import { RIGHT_DRAWER_TYPES } from '../helper/app-constants'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { closeRightDrawer } from '../features/common/rightDrawerSlice'
import NotificationBodyRightDrawer from '../features/common/notification-body-right-drawer'

function RightSidebar() {
    const { isOpen, bodyType, extraObject, header } = useAppSelector((state) => state.rightDrawer)
    const dispatch = useAppDispatch()

    const close = () => {
        dispatch(closeRightDrawer())
    }

    return (
        <div className={" fixed overflow-hidden z-20 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " + (isOpen ? " transition-opacity opacity-100 duration-500 translate-x-0  " : " transition-all delay-500 opacity-0 translate-x-full  ")}>
            <section className={"w-80 md:w-96  right-0 absolute bg-base-100 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " + (isOpen ? " translate-x-0 " : " translate-x-full ")}>
                <div className="relative flex flex-col h-full pb-5">
                    {/* Header */}
                    <div className="flex pl-4 pr-4 shadow-md navbar ">
                        <button className="float-left btn btn-circle btn-outline btn-sm" onClick={(e) => close()}>
                            <XMarkIcon className="w-5 h-5"/>
                        </button>
                        <span className="ml-2 text-xl font-bold">{header}</span>
                    </div>
                    {/* ------------------ Content Start ------------------ */}
                    <div className="pl-4 pr-4 overflow-y-scroll">
                        <div className="flex flex-col w-full">
                            {/* Loading drawer body according to different drawer type */}
                            {
                                {
                                    [RIGHT_DRAWER_TYPES.NOTIFICATION]: <NotificationBodyRightDrawer {...extraObject} closeRightDrawer={close}/>,
                                    [RIGHT_DRAWER_TYPES.DEFAULT]: <div></div>
                                }[bodyType]
                            }
                        </div>
                    </div>
                    {/* ------------------ Content End ------------------ */}
                </div>
            </section>
            <section className="w-screen h-full cursor-pointer " onClick={(e) => close()} ></section>
        </div>
    )
}

export default RightSidebar
