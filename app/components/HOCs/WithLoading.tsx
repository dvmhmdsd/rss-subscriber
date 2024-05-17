import { useNavigation } from "@remix-run/react";
import { Progress } from "~/components/ui/progress";
import { useLoadingProgress } from "~/hooks/useLoadingProgress";

export const WithLoading = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const navigation = useNavigation();
  const progress = useLoadingProgress(navigation.state);

  return navigation.state === "loading" ? (
    <div className="w-4/5 mx-auto h-[calc(100vh-200px)] flex items-center">
      <Progress value={progress} />
    </div>
  ) : (
    children
  );
};
