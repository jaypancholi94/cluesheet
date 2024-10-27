import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  CircleAlert,
  CircleHelp,
  CircleX,
  Ellipsis,
} from "lucide-react";
import { FIELD_VALUE, SUSPECTS, WEAPONS, ROOMS, CATEGORY } from "@/constants";
import { useDispatch } from "react-redux";
import { updateClueSheetValue } from "@/store/reducers/clue-sheet-slice";

export type InputSelectorProps = {
  value: (typeof FIELD_VALUE)[keyof typeof FIELD_VALUE];
  rowKey:
    | (typeof SUSPECTS)[number]
    | (typeof WEAPONS)[number]
    | (typeof ROOMS)[number];
  playerName: string;
  category: (typeof CATEGORY)[keyof typeof CATEGORY];
};
export const InputSelector: React.FC<InputSelectorProps> = ({
  value,
  rowKey,
  playerName,
  category,
}) => {
  const dispatch = useDispatch();
  const mapIcon = {
    [FIELD_VALUE.empty]: <Ellipsis className="opacity-50" size={28} />,
    [FIELD_VALUE.crossed]: <CircleX className="text-red-600" size={28} />,
    [FIELD_VALUE.maybe]: <CircleHelp className="text-yellow-500" size={28} />,
    [FIELD_VALUE.suspicious]: (
      <CircleAlert className="text-orange-500" size={28} />
    ),
    [FIELD_VALUE.checked]: <CheckCircle className="text-green-600" size={28} />,
  };

  const handleClick = (newValue: InputSelectorProps["value"]) => {
    dispatch(
      updateClueSheetValue({ value: newValue, rowKey, playerName, category }),
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="w-full flex justify-center cursor-pointer">
          {mapIcon[value]}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Input</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="opacity-50 font-semibold hover:cursor-pointer"
            onClick={() => {
              handleClick(FIELD_VALUE.empty);
            }}
          >
            <Ellipsis /> <span>No selection</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 font-semibold hover:cursor-pointer"
            onClick={() => {
              handleClick(FIELD_VALUE.crossed);
            }}
          >
            <CircleX /> <span>Crossed</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-yellow-500 font-semibold hover:cursor-pointer"
            onClick={() => {
              handleClick(FIELD_VALUE.maybe);
            }}
          >
            <CircleHelp /> <span>Question Mark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-orange-500 font-semibold hover:cursor-pointer"
            onClick={() => {
              handleClick(FIELD_VALUE.suspicious);
            }}
          >
            <CircleAlert /> <span>Suspicious</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-green-600 font-semibold hover:cursor-pointer"
            onClick={() => {
              handleClick(FIELD_VALUE.checked);
            }}
          >
            <CheckCircle /> <span>checked</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
