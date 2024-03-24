import { OrdersDataTable } from '@/components/orders-data-table';
import { PageTitle } from '@/components/page-title';
import { WithdrawMoneyDataTable } from '@/components/withdraw-money-data-table';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col gap-5 w-full mx-auto max-w-screen-xl">
      <PageTitle title="Withdraw Requests" />
      <WithdrawMoneyDataTable />
    </div>
  );
};

export default page;
