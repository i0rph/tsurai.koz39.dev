/* eslint-disable solid/no-innerhtml */
import { Component, ParentComponent } from 'solid-js';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'solid-headless';
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from 'solid-icons/hi';

interface IFAQContent {
  question: string;
  answer: string;
}

export const FAQContainer: ParentComponent = props => {
  return <dl class="mt-2 space-y-6 divide-y divide-white/10 sm:mt-4">{props.children}</dl>;
};

export const FAQContent: Component<IFAQContent> = props => {
  return (
    <Disclosure defaultOpen={false} as="div" class="pt-6">
      {({ isOpen }) => (
        <>
          <dt>
            <DisclosureButton class="flex w-full items-start justify-between text-left text-white">
              <span class="text-base/7 font-semibold" innerHTML={props.question} />
              <span class="ml-6 flex h-7 items-center">
                {isOpen() ? <HiOutlineMinusSmall class="h-6 w-6" aria-hidden="true" /> : <HiOutlinePlusSmall class="h-6 w-6" aria-hidden="true" />}
              </span>
            </DisclosureButton>
          </dt>
          <DisclosurePanel as="dd" class="mt-4 pr-12">
            <p class="text-base/7 text-gray-300" innerHTML={props.answer} />
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
