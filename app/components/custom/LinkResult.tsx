import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useTranslation } from "react-i18next";

export default function LinkResult({ link }: Readonly<{ link: string }>) {
  const [clicked, setClicked] = useState(false);
  const { t } = useTranslation();

  const handleCopyBtnClick = () => {
    setClicked(true);
    navigator.clipboard.writeText(link ?? "");
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <h2 className="text-left block sm:hidden">{t("channel_rss")}</h2>
          <div className="rounded-md border sm:px-4 px-2 py-1 text-sm m-auto flex justify-between items-center text-wrap w-full relative">
            <p>{link}</p>

            <Button
              variant="ghost"
              onClick={handleCopyBtnClick}
              aria-label="Copy"
              className="absolute sm:relative right-0 z-10 sm:z-0 bg-slate-50 bg-opacity-80 sm:bg-opacity-0 cursor-pointer"
            >
              {clicked ? <CheckIcon color="green" /> : <CopyIcon />}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("channel_rss")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
