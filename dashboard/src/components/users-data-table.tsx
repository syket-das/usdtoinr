// @ts-nocheck
'use client';

import { DataTable } from '@/components/data-table';
import useUserStore from '@/store/userStore';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useEffect } from 'react';

type Payment = {
  name: string;
  email: string;
  role: string;
  phone: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Image
            className="w-10 h-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              'name'
            )}`}
            alt="avater"
            width={10}
            height={10}
          />
          <p>{row.getValue('name')} </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',

    cell: ({ row }) => {
      return (
        <a href={`tel:${row.getValue('phone')}`}>
          {row.getValue('phone') || 'NA'}
        </a>
      );
    },
  },

  {
    accessorKey: 'role',
    header: 'Role',
  },
];

export const UsersDataTable = () => {
  const { getUsers, users } = useUserStore((state) => state);

  useEffect(() => {
    getUsers();
  }, []);

  return <DataTable columns={columns} data={users} />;
};
