// @ts-nocheck
'use client';

import { DataTable } from '@/components/data-table';
import { cn } from '@/lib/utils';
import useMoneyStore from '@/store/moneyStore';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { headers } from 'next/headers';
import { useEffect, useState } from 'react';

export const AddMoneyRequestDataTable = () => {
  const [allData, setAllData] = useState([]);

  const {
    approveAddMoneyRequest,
    rejectAddMoneyRequest,
    completeAddMoneyRequest,
  } = useMoneyStore((state) => state);

  const fetchInvoices = async () => {
    const { data } = await axios.post(
      'https://payid19.com/api/v1/get_invoices',

      {
        public_key: '5JOYa4SCMUiiPH9NKVYoa49wW',
        private_key: 'Zlk6IU7x8Av9QsSvJaUWlOjyJChpJoR14FLhoLns',
        status: 'default',
      }
    );

    const js = await JSON.parse(data.message);

    setAllData(js);
  };

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: ({ row }) => {
        return <div>{row.original.id}</div>;
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      accessorKey: 'amount_currency',
      header: 'Amount Currency',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <div>{JSON.stringify(row.original.status)}</div>;
      },
    },
    {
      accessorKey: 'success_url',
      header: 'Success Url',
    },
  ];
  const { addMoneyRequests, getAddMoneyRequests } = useMoneyStore(
    (state) => state
  );

  useEffect(() => {
    fetchInvoices();
  }, []);

  return <DataTable columns={columns} data={allData} />;
};
