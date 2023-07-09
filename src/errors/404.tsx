import { JSXElement } from 'solid-js';
import { A } from '@solidjs/router';

export default function NotFound(): JSXElement {
  return (
    <section class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-blue-600">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">페이지를 찾을 수 없음</h1>
        <p class="mt-6 break-keep text-base leading-7 text-gray-600">찾고자 하는 페이지를 발견하지 못했습니다.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <A href="/" class="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600">
            홈으로
          </A>
        </div>
      </div>
    </section>
  );
}
