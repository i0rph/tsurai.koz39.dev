import { JSXElement } from 'solid-js';

interface IFragment {
  children: JSXElement;
}

export default function Fragment(props: IFragment): JSXElement {
  return <>{props.children}</>;
}
