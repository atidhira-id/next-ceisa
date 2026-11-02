import { CircleAlert } from "lucide-react";

export function Warning({ text }: { text: string }) {
  return (
    <div className="w-full bg-yellow-200 rounded-sm flex gap-1 items-center p-3 mb-4">
      <CircleAlert size={20} />
      <div className="text-sm text-gray-800">{text}</div>
    </div>
  );
}
