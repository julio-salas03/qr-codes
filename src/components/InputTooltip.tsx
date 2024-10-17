import { JSX } from 'solid-js';
import { AlertCircle } from './icons/alert-circle';
import { PopoverTrigger, PopoverContent, Popover } from './ui/popover';
import { Title as PopoverTitle } from '@kobalte/core/popover';
export type InputTooltipProps = {
  children: JSX.Element;
  title: string;
  triggerText: string;
};

export default function InputTooltip(props: InputTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <span class="sr-only">{props.triggerText}</span>
        <AlertCircle />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverTitle class="sr-only">{props.title}</PopoverTitle>
        <p>{props.children}</p>
      </PopoverContent>
    </Popover>
  );
}
