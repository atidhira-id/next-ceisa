type InputWrapperProps = {
  title: string;
  headerChildren?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function InputWrapper({
  title,
  headerChildren,
  className = "",
  children,
}: InputWrapperProps) {
  return (
    <div
      className={`h-fit w-full rounded-sm border border-slate-200 bg-white ${className}`}
    >
      {/* HEADER */}
      <div className="flex w-full items-center justify-between gap-3 border-b border-slate-200 bg-slate-100 px-4 py-3">
        <p className="text-sm font-semibold text-slate-700 py-4">{title}</p>

        {headerChildren && <div className="shrink-0">{headerChildren}</div>}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-5 px-4 pt-5 pb-8">{children}</div>
    </div>
  );
}
