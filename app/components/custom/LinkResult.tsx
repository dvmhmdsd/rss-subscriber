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
          <div className="rounded-md border px-4 py-1 text-sm m-auto w-full flex justify-between items-center">
            {link}

            <Button
              variant="ghost"
              onClick={handleCopyBtnClick}
              aria-label="Copy"
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
