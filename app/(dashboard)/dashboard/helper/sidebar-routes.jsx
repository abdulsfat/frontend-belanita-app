import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import { ClipboardDocumentListIcon, CubeIcon, NewspaperIcon, PhoneArrowDownLeftIcon, ShoppingBagIcon, TagIcon, UserGroupIcon} from '@heroicons/react/24/outline';

const iconClasses = 'h-6 w-6';
const submenuIconClasses = 'h-5 w-5';

const routes = [
  {
    path: '/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    pageName: 'Dashboard',
    pageTitle: 'Dashboard',
  },
  {
    path: '/emergencies',
    icon: <PhoneArrowDownLeftIcon className={iconClasses} />,
    pageName: 'Emergencies',
    pageTitle: 'Emergency Requests',
  },
  {
    path: '/complaints',
    icon: <ClipboardDocumentListIcon className={iconClasses} />,
    pageName: 'Complaints',
    pageTitle: 'Complaints',
  },
  {
    path: '/articles',
    icon: <NewspaperIcon className={iconClasses} />,
    pageName: 'Articles',
    pageTitle: 'Articles',
  },
  {
    path: '/merchandises',
    icon: <ShoppingBagIcon className={iconClasses} />,
    pageName: 'Merchandises',
    pageTitle: 'Merchandises',
  },
  {
    path: '/categories',
    icon: <TagIcon className={iconClasses} />,
    pageName: 'Categories',
    pageTitle: 'Merchandise Categories',
  },
  {
    path: '/orders',
    icon: <CubeIcon className={iconClasses} />,
    pageName: 'Orders',
    pageTitle: 'Merchandise Orders',
  },
  {
    path: '/users',
    icon: <UserGroupIcon className={iconClasses} />,
    pageName: 'Users',
    pageTitle: 'Users',
  },
];

export default routes;
