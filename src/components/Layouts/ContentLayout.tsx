import { JSXElement } from 'solid-js';

interface IContentLayout {
  children: JSXElement;
}

export default function ContentLayout(props: IContentLayout): JSXElement {
  return <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{props.children}</div>;
}
