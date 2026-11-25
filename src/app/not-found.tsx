import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/10 text-warning border border-warning/20 mb-6">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-2">
        Page Not Found
      </h2>
      <p className="max-w-md text-sm text-muted-foreground mb-6">
        The requested resource or threat investigation route could not be found.
      </p>
      <Button asChild>
        <Link href="/">Return to Center</Link>
      </Button>
    </div>
  );
}
