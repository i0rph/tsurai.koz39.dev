import { Accessor, Component } from 'solid-js';
import { Transition } from 'solid-headless';

interface IBanner {
  content: string;
  bannerOpen: Accessor<boolean>;
}

const Banner: Component<IBanner> = props => {
  return (
    <Transition
      show={props.bannerOpen()}
      as="div"
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-y-full opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-full opacity-0"
      class="mx-4 mt-4 flex items-center justify-between gap-x-6 rounded-lg bg-blue-900 px-6 py-2.5 sm:mx-8 sm:pr-3.5"
    >
      <p class="text-sm/6 font-semibold text-white">{props.content}</p>
    </Transition>
  );
};

export default Banner;
