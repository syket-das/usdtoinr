// @ts-nocheck
'use client';

import { DataTable } from '@/components/data-table';
import { cn } from '@/lib/utils';
import useMoneyStore from '@/store/moneyStore';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export const AddMoneyRequestDataTable = () => {
  const {
    approveAddMoneyRequest,
    rejectAddMoneyRequest,
    completeAddMoneyRequest,
  } = useMoneyStore((state) => state);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'transactionId',
      header: 'Transaction ID',
    },
    {
      accessorKey: 'usdt',
      header: 'USDT (T)',
    },

    {
      accessorKey: 'exchangeRate',
      header: 'Exchange Rate',
      cell: ({ row }) => {
        console.log(row.original);

        return <div>{row.original.exchangeRate?.rate}</div>;
      },
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <div
            className={cn('font-medium w-fit px-4 py-2 rounded-lg', {
              'bg-red-200': row.getValue('status') === 'PENDING',
              'bg-red-700': row.getValue('status') === 'REJECTED',
              'bg-green-200': row.getValue('status') === 'VERIFIED',
              'bg-green-700': row.getValue('status') === 'COMPLETED',
            })}
          >
            {row.getValue('status')}
          </div>
        );
      },
    },
    {
      accessorKey: 'accountNumber',
      header: 'Account Number',
    },
    {
      accessorKey: 'method',
      header: 'Payment Method',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        return <div>{new Date(row.original.createdAt).toLocaleString()}</div>;
      },
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: ({ row }) => {
        return (
          <div>
            <div className="">
              <div className="text-sm font-medium">
                {row.original.user?.name}
              </div>
              <div className="text-xs text-gray-500">
                {row.original.user?.email}
              </div>
              <div className="text-xs text-gray-500">
                {row.original.user?.phone}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <div className="flex space-x-4">
            <button
              style={{
                display: row.original.status === 'PENDING' ? 'block' : 'none',
              }}
              className="text-sm font-medium text-green-500 border border-green-500 rounded-lg px-4 py-2"
              onClick={async () => {
                await approveAddMoneyRequest(row.original.id);
              }}
            >
              Verify
            </button>
            <button
              style={{
                display: row.original.status === 'PENDING' ? 'block' : 'none',
              }}
              className="text-sm font-medium text-red-500 border border-red-500 rounded-lg px-4 py-2"
              onClick={() => {
                rejectAddMoneyRequest(row.original.id);
              }}
            >
              Reject
            </button>
            <button
              style={{
                display: row.original.status === 'VERIFIED' ? 'block' : 'none',
              }}
              className="text-sm font-medium text-blue-500 border border-blue-500 rounded-lg px-4 py-2"
              onClick={() => {
                completeAddMoneyRequest(row.original.id);
              }}
            >
              Mark as Completed
            </button>
          </div>
        );
      },
    },
  ];
  const { addMoneyRequests, getAddMoneyRequests } = useMoneyStore(
    (state) => state
  );

  useEffect(() => {
    getAddMoneyRequests();
  }, []);

  return <DataTable columns={columns} data={addMoneyRequests} />;
};
