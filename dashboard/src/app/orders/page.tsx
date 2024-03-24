'use client';

import isAuth from '@/components/isAuth';
import { OrdersDataTable } from '@/components/orders-data-table';
import { PageTitle } from '@/components/page-title';

type Props = {};

const OrdersPage = ({}: Props) => {
  return (
    <div className="flex flex-col gap-5 w-full mx-auto max-w-screen-xl">
      <PageTitle title="Orders" />
      <OrdersDataTable />
    </div>
  );
};

export default isAuth(OrdersPage);
