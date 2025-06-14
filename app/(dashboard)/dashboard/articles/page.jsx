'use client';
import TitleCard from '@/components/cards/title-card';
import DummyData from '@/helper/dummy-data';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

const ArticleAdmin = () => {
  const title = 'Articles Data';
  const columns = [
    { label: 'Title', key: 'title' },
    { label: 'Image', key: 'image' },
    { label: 'Content', key: 'content' },
    { label: 'Status', key: 'status' },
    { label: 'User', key: 'user_id' },
    { label: 'Actions', key: 'actions' },
  ];

  const data = [
    {
      title: 'Tips Tanaman Hias',
      image: 'https://picsum.photos/200',
      content: 'Cara merawat tanaman hias di rumah...',
      status: 'Published',
      user_id: 'Admin',
    },
    {
      title: 'Pupuk Organik',
      image: 'https://picsum.photos/200',
      content: 'Pupuk dari limbah dapur...',
      status: 'Draft',
      user_id: 'Admin',
    },
  ];

  const getStatusComponent = (status) => {
    if (status === 'Draft')
      return <div className="badge badge-accent">{status}</div>;
    if (status === 'Published')
      return <div className="badge badge-primary">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };

  const TopSideButtons = () => {
    return (
      <div className="inline-block float-right">
        <Link
          href="/articles/create"
          className="px-6 normal-case btn btn-sm btn-primary"
        >
          Add article
        </Link>
      </div>
    );
  };
  const submenuIconClasses = 'h-5 w-5 mr-2';
  const [members, setMembers] = useState(DummyData.TEAM_MEMBERS_LIST);

  return (
    <>
      <TitleCard
        title="List of Articles"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Content</th>
                <th>User</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-12 h-12 mask mask-circle">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.email}</td>
                    <td>{l.joinedOn}</td>
                    <td>{l.lastActive}</td>
                    <td>{getStatusComponent(l.status)}</td>
                    <td>
                      <div>
                        <button>
                          <PencilSquareIcon className={submenuIconClasses} />
                        </button>
                        <button>
                          <TrashIcon className={submenuIconClasses} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default ArticleAdmin;
