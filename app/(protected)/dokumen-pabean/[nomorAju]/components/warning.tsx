export function Warning({ text }: { text: string }) {
  return (
    <div className="w-full bg-yellow-200 rounded-sm flex gap-2 items-center p-3 mb-4">
      <div className="w-5 h-5 rounded-full bg-yellow-500 flex justify-center items-center p-1">
        !
      </div>
      <div className="text-sm text-gray-800">{text}</div>
    </div>
  );
}
