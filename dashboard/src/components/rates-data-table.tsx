// @ts-nocheck
'use client';

import { DataTable } from '@/components/data-table';
import useExchangeRateStore from '@/store/exchangeRateStore';
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
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
  },
  {
    accessorKey: 'user',
    header: 'User',

    cell: ({ row }) => {
      console.log(row);

      return (
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold">{row.original.user?.name || ''}</p>
            <p className="text-gray-500">{row.original.user?.email || ''}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
];

export const RatesDataTable = () => {
  const { exchangeRates, getExchangeRates } = useExchangeRateStore(
    (state) => state
  );

  useEffect(() => {
    getExchangeRates();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={exchangeRates} />;
    </>
  );
};
