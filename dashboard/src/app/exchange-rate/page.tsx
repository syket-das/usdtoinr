// @ts-nocheck
'use client';
import { PageTitle } from '@/components/page-title';
import { RatesDataTable } from '@/components/rates-data-table';
import { Button } from '@/components/ui/button';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import useExchangeRateStore from '@/store/exchangeRateStore';

const Page = () => {
  const { addExchangeRate } = useExchangeRateStore((state) => state);
  const [rate, setRate] = React.useState(0);

  const handleAddExchangeRate = async () => {
    try {
      if (rate <= 0) {
        return;
      }

      await addExchangeRate({ rate });

      setRate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full mx-auto max-w-screen-xl">
      <PageTitle title="Exchange Rates" />
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary">Add Exchange Rate</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exchange Rate</DialogTitle>
              <DialogDescription className="text-red-700">
                Make sure to add the correct exchange rate. Once added, it
                cannot be changed.
              </DialogDescription>
            </DialogHeader>

            <div className="h-5" />
            <div className="flex flex-col gap-4">
              <Label htmlFor="rate">Today&apos;s Rate</Label>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <div className="h-5" />

            <Button
              onClick={handleAddExchangeRate}
              className="w-full"
              variant="default"
            >
              Add
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-5" />
      <RatesDataTable />
    </div>
  );
};

export default Page;
