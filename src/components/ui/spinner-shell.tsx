import { cn } from "@/lib/utils";
import { Shell } from "lucide-react";

function SpinnerShell({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Shell
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { SpinnerShell };
