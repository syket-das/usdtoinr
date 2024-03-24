'use client';

import { AddMoneyRequestDataTable } from '@/components/add-money-request-data-table';
import ClientOnly from '@/components/ClientOnly';
import isAuth from '@/components/isAuth';
import { PageTitle } from '@/components/page-title';

type Props = {};

const AddMoney = ({}: Props) => {
  return (
    <ClientOnly>
      <div className="flex flex-col gap-5 w-full mx-auto max-w-screen-xl">
        <PageTitle title="Add Money Requests" />
        <AddMoneyRequestDataTable />
      </div>
    </ClientOnly>
  );
};

export default isAuth(AddMoney);
