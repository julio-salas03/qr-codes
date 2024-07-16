import { JSX } from "solid-js";
import { AlertCircle } from "./icons/alert-circle";
import { PopoverTrigger, PopoverContent, Popover } from "./ui/popover";

export type InputTooltipProps = {
  children: JSX.Element;
};

export default function InputTooltip(props: InputTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <AlertCircle />
      </PopoverTrigger>
      <PopoverContent>{props.children}</PopoverContent>
    </Popover>
  );
}
