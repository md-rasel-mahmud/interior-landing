import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSettingPageSkeleton() {
  return (
    <div className='p-6 space-y-6 bg-white rounded-none-none'>
      <div className='space-y-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className='h-10 w-full' />
        ))}
      </div>
    </div>
  );
}
