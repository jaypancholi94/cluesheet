import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Button } from "../ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updatePlayer } from "@/store/reducers/player-slice";
import { resetClueSheet } from "@/store/reducers/clue-sheet-slice";

type PlayerBoxProps = {
  isInit?: boolean;
  triggerButton?: React.ReactNode;
};

export const PlayerBox: React.FC<PlayerBoxProps> = ({
  isInit,
  triggerButton,
}) => {
  const dispatch = useDispatch();
  const { playerList } = useSelector((state: RootState) => ({
    playerList: state.player.names,
  }));

  const [isOpen, setIsOpen] = useState<boolean>(!!isInit);
  const [playerData, setPlayerData] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const [errorIndex, setErrorIndex] = useState<number[]>([]);

  useEffect(() => {
    setPlayerData(
      playerList.map((name: string, index: number) => ({
        id: index + 1,
        name,
      })),
    );
  }, [playerList]);

  useEffect(() => {
    if (!!isInit) {
      setIsOpen(!!isInit);
    }
  }, [isInit]);

  const validatePlayerNames = () => {
    setErrorIndex((prevErrorIndex) => {
      // Find indices of players with an empty name
      const newErrorIndices = playerData
        .map((player, index) => (player.name.trim() === "" ? index : -1))
        .filter((index) => index !== -1);

      // Return the combined error indices (prevent duplicates)
      return Array.from(new Set([...prevErrorIndex, ...newErrorIndices]));
    });
    return playerData.some((player) => player.name.trim() === "")
      ? true
      : false;
  };
  const resetErrors = () => {
    setError(null);
    setErrorIndex([]);
  };
  const resetPlayerIds = () => {
    setPlayerData((prevData) =>
      prevData.map((player, index) => ({
        ...player,
        id: index + 1, // Assign sequential IDs starting from 1
      })),
    );
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();
    if (playerData.length < 2) {
      setError("Please add at least 2 detectives to start the game.");
      return;
    }
    if (playerData.length > 6) {
      setError("You can only have a maximum of 6 detectives in a game.");
      return;
    }
    if (validatePlayerNames()) {
      setError("Detective names cannot be empty.");
      return;
    }
    resetErrors();
    const _playerList = playerData.map((player) => player.name);

    dispatch(updatePlayer({ names: _playerList }));
    dispatch(resetClueSheet());
    setIsOpen(false);
  };

  const handleAddPlayer = () => {
    setPlayerData([...playerData, { id: playerData.length + 1, name: "" }]);
  };
  const handleTextChange = (value: string, index: number) => {
    setPlayerData((prevData) =>
      prevData.map((player, i) =>
        i === index ? { ...player, name: value } : player,
      ),
    );
  };
  const handleRemoveName = (index: number) => {
    setPlayerData((prevData) => prevData.filter((_, i) => i !== index));
    resetPlayerIds();
  };
  const movePlayer = (activeIndex: number, overIndex: number) => {
    setPlayerData((prevData) => {
      // Step 1: Remove the player from the active index
      const playerToMove = prevData[activeIndex];
      const updatedData = prevData.filter((_, index) => index !== activeIndex);

      // Step 2: Insert the player at the over index
      updatedData.splice(overIndex, 0, playerToMove);

      return updatedData;
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={!isInit ? setIsOpen : undefined}>
      {triggerButton}
      <DialogContent className="sm:max-w-[425px]" hideClose>
        <DialogHeader>
          <DialogTitle>
            {isInit
              ? "Summon a New Sleuth 🕵️‍♀️"
              : "Refine Your Detective’s Identity 🔍"}
          </DialogTitle>
          <DialogDescription>
            {isInit
              ? "Ready to expand your team of detectives? Add a new sleuth to join the investigation."
              : "Need to adjust your detective’s persona? Whether it's updating their alias or tweaking their details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Sortable
            value={playerData}
            onMove={({ activeIndex, overIndex }) => {
              movePlayer(activeIndex, overIndex);
            }}
            overlay={
              <div className="grid grid-cols-[1fr,auto,auto] items-center gap-2">
                <div className="h-8 w-full rounded-sm bg-primary/10" />
                <div className="size-8 shrink-0 rounded-sm bg-primary/10 w-10" />
                <div className="size-8 shrink-0 rounded-sm bg-primary/10 w-10" />
              </div>
            }
          >
            <div className="w-full">
              <div className="py-6 flex flex-col gap-2">
                {playerData.length === 0 && (
                  <div className="text-center text-gray-400">
                    🕵️‍♂️ No detectives on the case yet!{" "}
                  </div>
                )}
                {playerData.map((field, index) => (
                  <SortableItem key={field.id} value={field.id} asChild>
                    <div className="grid grid-cols-[1fr,auto,auto] gap-2">
                      <input
                        type="text"
                        value={field.name}
                        name={`player-${index}`}
                        className={cn(
                          "w-full h-full rounded-sm border border-primary/10 px-2",
                          errorIndex.includes(index) && "border-red-500",
                        )}
                        onChange={(e) => {
                          handleTextChange(e.target.value, index);
                        }}
                      />
                      <SortableDragHandle
                        variant="outline"
                        size="icon"
                        className="h-full py-2 w-10"
                      >
                        <GripVertical />
                      </SortableDragHandle>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleRemoveName(index)}
                        className="h-full py-2 w-10"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </SortableItem>
                ))}
              </div>
              <Button
                onClick={handleAddPlayer}
                variant={"outline"}
                className="w-full"
                type="button"
              >
                Add Detective
              </Button>
            </div>
          </Sortable>
          {error && <div className="text-red-500 pt-4">{error}</div>}
          {!isInit && (
            <div className="opacity-60 mt-2">
              Updating this setting will reset clue sheet
            </div>
          )}
          <DialogFooter className="pt-8">
            <Button type="submit">Save</Button>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              variant="outline"
            >
              cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
