"use client";
import { Header } from "@/components/header";
import { PlayerBox } from "@/components/player-box";
import { SheetTable } from "@/components/sheet-table";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const { players, suspectList, weaponList, roomList } = useSelector(
    (state: RootState) => ({
      players: state.player.names,
      suspectList: state.table.suspectList,
      weaponList: state.table.weaponList,
      roomList: state.table.roomList,
    }),
  );
  const showTable =
    players?.length >= 2 &&
    suspectList.length !== 0 &&
    weaponList.length !== 0 &&
    roomList.length !== 0;

  return (
    <div>
      <Header />
      {players?.length < 2 && <PlayerBox isInit />}
      {showTable && (
        <div className="container mx-auto">
          <SheetTable />
        </div>
      )}
    </div>
  );
}
