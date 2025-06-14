import {
    ClipboardDocumentListIcon,
    NewspaperIcon,
    PhoneArrowDownLeftIcon,
    UsersIcon
} from '@heroicons/react/24/outline';

const statsData = [
    {
        title: 'Total Articles',
        value: '12',
        icon: <NewspaperIcon className="w-8 h-8" />,
    },
    {
        title: 'Total Complaints',
        value: '10',
        icon: <ClipboardDocumentListIcon className="w-8 h-8" />,
    },
    {
        title: 'Total Emergency Requests',
        value: '5',
        icon: <PhoneArrowDownLeftIcon className="w-8 h-8" />,
    },
    {
        title: 'Active Users',
        value: '20',
        icon: <UsersIcon className="w-8 h-8" />,
    },
];

const Dashboard = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
                {statsData.map((d, k) => (
                    <div key={k} className="shadow stats">
                        <div className="stat">
                            <div className="stat-figure">{d.icon}</div>
                            <div className="stat-title text-wrap">{d.title}</div>
                            <div className="mt-2 stat-value">{d.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;