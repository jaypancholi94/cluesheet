import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  RowList,
  updateCrossedRowValue,
} from "@/store/reducers/clue-sheet-slice";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { CATEGORY, SUSPECTS } from "@/constants";
import { useState } from "react";
import { InputSelector } from "../input-selector";

const SUSPECTS_COLORS = {
  [SUSPECTS[0]]: "bg-amber-200",
  [SUSPECTS[1]]: "bg-red-400",
  [SUSPECTS[2]]: "bg-purple-400",
  [SUSPECTS[3]]: "bg-blue-400",
  [SUSPECTS[4]]: "bg-green-300",
  [SUSPECTS[5]]: "bg-slate-100",
};

const RenderRows = ({
  list,
  numberOfColumns,
  isHidden,
  category,
}: {
  list: RowList[];
  numberOfColumns: number;
  isHidden: boolean;
  category: (typeof CATEGORY)[keyof typeof CATEGORY];
}) => {
  const dispatch = useDispatch();
  const spacingMap: { [key: number]: string } = {
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
    6: "w-1/6",
    7: "w-[14.2857%]",
  };

  const rows = list.map((row: RowList) => {
    const key = uuidv4();

    return (
      <tr
        key={key}
        className={cn(
          "hover:bg-slate-100",
          row.isCrossed && !isHidden && "opacity-20",
        )}
      >
        <td
          className={cn(
            "border py-2 px-2 bg-slate-300 font-semibold",
            spacingMap[numberOfColumns],
            SUSPECTS_COLORS[row.label],
          )}
        >
          <div
            className="w-full cursor-pointer"
            onClick={() => {
              dispatch(
                updateCrossedRowValue({
                  category,
                  rowKey: row.label,
                  value: !row.isCrossed,
                }),
              );
            }}
          >
            {row.label}
          </div>
        </td>
        {row.value.map((value) => {
          const key = Object.keys(value)[0];
          const uuid = uuidv4();
          return (
            <td
              key={uuid}
              className={cn(
                "border py-2 px-2 text-center",
                spacingMap[numberOfColumns],
              )}
            >
              {isHidden ? (
                <span className="text-xl">🫣</span>
              ) : (
                <InputSelector
                  value={value[key]}
                  rowKey={row.label}
                  playerName={key}
                  category={category}
                />
              )}
            </td>
          );
        })}
      </tr>
    );
  });
  return rows;
};
const SectionHeader = ({
  title,
  colSpan,
}: {
  title: string;
  colSpan: number;
}) => {
  return (
    <tr>
      <td colSpan={colSpan} className="border py-2 px-2 bg-red-200">
        <h3 className="text-lg font-semibold">{title}</h3>
      </td>
    </tr>
  );
};
export const SheetTable = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const { players, suspectList, weaponList, roomList } = useSelector(
    (state: RootState) => ({
      players: state.player.names,
      suspectList: state.table.suspectList,
      weaponList: state.table.weaponList,
      roomList: state.table.roomList,
    }),
  );
  const numberOfColumns = players.length + 1;
  const headerStyle = "sticky top-0 mx-2 bg-gray-800 text-white";
  return (
    <div className="mb-20">
      <table className="w-full">
        <thead>
          <tr>
            <th className={headerStyle}>
              <Button
                variant={"ghost"}
                className="bg-transparent w-full"
                onClick={() => setIsHidden((prev) => !prev)}
              >
                {isHidden ? <Eye /> : <EyeOff />}
              </Button>
            </th>
            {players.map((player: string) => (
              <th key={player} className={headerStyle}>
                {player}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <SectionHeader title={CATEGORY.suspects} colSpan={numberOfColumns} />
          <RenderRows
            list={suspectList}
            numberOfColumns={numberOfColumns}
            isHidden={isHidden}
            category={CATEGORY.suspects}
          />

          <SectionHeader title={CATEGORY.weapons} colSpan={numberOfColumns} />
          <RenderRows
            list={weaponList}
            numberOfColumns={numberOfColumns}
            isHidden={isHidden}
            category={CATEGORY.weapons}
          />

          <SectionHeader title={CATEGORY.rooms} colSpan={numberOfColumns} />
          <RenderRows
            list={roomList}
            numberOfColumns={numberOfColumns}
            isHidden={isHidden}
            category={CATEGORY.rooms}
          />
        </tbody>
      </table>
    </div>
  );
};
