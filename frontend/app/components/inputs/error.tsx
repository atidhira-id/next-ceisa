export default function Error({ id, err }: { id: string; err: string }) {
  return (
    <p id={`${id}-error`} className="mt-1 text-sm text-red-600 tracking-wide">
      {err}
    </p>
  );
}
