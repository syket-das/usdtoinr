'use client';
import { PageTitle } from '@/components/page-title';
import { UsersDataTable } from '@/components/users-data-table';
import isAuth from '@/components/isAuth';

type Props = {};

const UsersPage = ({}: Props) => {
  return (
    <div className="flex flex-col gap-5 w-full mx-auto max-w-screen-xl">
      <PageTitle title="Users" />
      <UsersDataTable />
    </div>
  );
};

export default isAuth(UsersPage);
