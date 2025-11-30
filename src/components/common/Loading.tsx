import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='flex flex-col space-y-3 w-full px-20'>
        <Skeleton className='h-[200px] w-full rounded-none-xl' />

        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </div>
  );
};

export default Loading;
