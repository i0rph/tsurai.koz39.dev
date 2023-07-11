import { Component } from 'solid-js';

const FAQSkeleton: Component = () => {
  return (
    <dt class="pt-6">
      <div class="flex w-full animate-pulse items-center justify-between px-6">
        <span class="h-4 w-full bg-slate-700 sm:w-1/3" />
      </div>
    </dt>
  );
};

export default FAQSkeleton;
