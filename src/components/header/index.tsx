import Image from "next/image";
import { memo, useState } from "react";
import { Button } from "../ui/button";
import { RotateCcw, Settings, UserRoundPen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlayerBox } from "@/components/player-box";
import { DialogTrigger } from "@/components/ui/dialog";
import { resetClueSheet } from "@/store/reducers/clue-sheet-slice";
import { useDispatch } from "react-redux";

export const Header: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={"w-full px-4 py-4 gap-2 items-center flex justify-around"}>
      <Image
        src={"/detective.svg"}
        width={50}
        height={50}
        alt="Clue Sheet Homepage"
      />
      <div className="flex flex-col">
        <h4 className="text-2xl text-primary font-audiowide">
          <span className="text-red-600">C</span>lue{" "}
          <span className="text-red-600">S</span>heet
        </h4>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            <Settings />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              Quickly manage your preferences: update players and/or reset game
              progress
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col my-8 gap-4">
            <PlayerBox
              triggerButton={
                <DialogTrigger>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className={"w-full"}
                  >
                    <UserRoundPen />
                    <span>Edit Players</span>
                  </Button>
                </DialogTrigger>
              }
            />
            <Button
              variant={"outline"}
              onClick={() => {
                dispatch(resetClueSheet());
                setIsOpen(false);
              }}
            >
              <RotateCcw />
              <span>Reset Game Progress</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
});

Header.displayName = "Header";
