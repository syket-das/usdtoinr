// @ts-nocheck

'use client';

import ClientOnly from '@/components/ClientOnly';
import isAuth from '@/components/isAuth';
import { PageTitle } from '@/components/page-title';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useBankStore from '@/store/bankStore';
import { useEffect, useState } from 'react';

type Props = {};

const SettingsPage = ({}: Props) => {
  const { adminBanks, getAdminBanks, addAdminBank, removeAdminBank } =
    useBankStore((state) => state);

  const [input, setInput] = useState({
    name: '',
    accountNumber: '',
    accountHolderName: '',
    branch: '',
    ifsc: '',
  });

  useEffect(() => {
    getAdminBanks();
  }, []);

  const handleSubmit = async () => {
    if (!input.name || !input.accountNumber) {
      alert('Please fill account name and number fields.');
      return;
    }

    try {
      await addAdminBank(input);
      await getAdminBanks();
    } catch (error) {
      alert('An error occurred while adding the bank account.');
    }
  };

  return (
    <ClientOnly>
      <div className="flex flex-col gap-5 w-full mx-auto max-w-screen-xl">
        <div className="flex justify-between items-center">
          <PageTitle title="Bank Accounts" />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Admin Bank</DialogTitle>
                <DialogDescription>
                  Fill all the fields to add a new bank account.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-red-500">
                    Bank Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={input.name}
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="accountNumber"
                    className="text-right text-red-500"
                  >
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    className="col-span-3"
                    value={input.accountNumber}
                    onChange={(e) =>
                      setInput({ ...input, accountNumber: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="accountHolderName" className="text-right">
                    Account Holder Name
                  </Label>
                  <Input
                    id="accountHolderName"
                    className="col-span-3"
                    value={input.accountHolderName}
                    onChange={(e) =>
                      setInput({ ...input, accountHolderName: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="branch" className="text-right">
                    Branch
                  </Label>
                  <Input
                    id="branch"
                    className="col-span-3"
                    value={input.branch}
                    onChange={(e) =>
                      setInput({ ...input, branch: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ifsc" className="text-right">
                    IFSC Code
                  </Label>
                  <Input
                    id="ifsc"
                    className="col-span-3"
                    value={input.ifsc}
                    onChange={(e) =>
                      setInput({ ...input, ifsc: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-8 flex  items-center gap-4  ">
          {adminBanks.map((bank) => (
            <div
              key={bank.id}
              className="flex flex-col  p-4 border border-gray-200 rounded-md w-52 h-full gap-2"
            >
              <p className="text-lg font-semibold">{bank.bankName}</p>
              <p className="text-gray-500">{bank.accountNumber}</p>
              <p className="text-gray-500">{bank.accountHolderName}</p>
              <p className="text-gray-500">{bank.branchName}</p>
              <p className="text-gray-500">{bank.ifscCode}</p>
              <Button
                variant="outline"
                onClick={async () => {
                  await removeAdminBank(bank.id);
                  await getAdminBanks();
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </ClientOnly>
  );
};

export default isAuth(SettingsPage);
