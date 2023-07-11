import { For, Accessor, Setter, Component } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { Dialog, DialogPanel, Transition, TransitionChild } from 'solid-headless';
import { HiOutlineBellAlert, HiOutlineQuestionMarkCircle } from 'solid-icons/hi';
import { twMerge } from 'tailwind-merge';
import Fragment from 'components/Fragment';

const navigation = [
  { name: '구독', href: '/', icon: HiOutlineBellAlert },
  { name: 'FAQ', href: '/faq', icon: HiOutlineQuestionMarkCircle },
];

interface ISidebarMobile {
  sidebarOpen: Accessor<boolean>;
  setSidebarOpen: Setter<boolean>;
}

const Sidebar: Component = () => {
  const location = useLocation();

  return (
    <section class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
        <A href="/" class="flex h-16 w-fit shrink-0 items-center">
          <img class="h-8 w-auto" src="/tsurai_logo_dark.png" alt="tsurai_logo" />
        </A>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <For each={navigation}>
                  {item => (
                    <li>
                      <A
                        href={item.href}
                        class={twMerge(
                          item.href === location.pathname ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        )}
                      >
                        <item.icon class="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </A>
                    </li>
                  )}
                </For>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export const SidebarMobile: Component<ISidebarMobile> = props => {
  const closeSidebar = () => {
    props.setSidebarOpen(false);
  };

  return (
    <Transition show={props.sidebarOpen()} as={Fragment}>
      <Dialog isOpen={props.sidebarOpen()} onClose={closeSidebar} class="relative z-50 xl:hidden">
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          class="fixed inset-0 bg-gray-900/80"
        />

        <TransitionChild
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          class="fixed inset-0 flex"
        >
          <DialogPanel class="flex flex-1">
            <div class="flex max-w-xs grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
              <A href="/" class="flex h-16 w-fit shrink-0 items-center">
                <img class="h-8 w-auto" src="/tsurai_logo_dark.png" alt="tsurai_logo" />
              </A>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <For each={navigation}>
                        {item => (
                          <li>
                            <A
                              href={item.href}
                              class={twMerge(
                                item.href === location.pathname ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              )}
                              onClick={closeSidebar}
                            >
                              <item.icon class="h-6 w-6 shrink-0" aria-hidden="true" />
                              {item.name}
                            </A>
                          </li>
                        )}
                      </For>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="flex flex-auto justify-center pt-5" onClick={closeSidebar} />
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default Sidebar;
