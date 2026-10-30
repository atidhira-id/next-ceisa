type InputWrapperProps = {
  title: string;
  headerChildren?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function InputWrapper({
  title,
  headerChildren,
  className,
  children,
}: InputWrapperProps) {
  return (
    <div className={`w-full h-fit border border-gray-300 ${className}`}>
      <div className="w-full flex justify-between bg-gray-200">
        <div className="text-sm font-bold p-4">
          <p>{title}</p>
        </div>
        {headerChildren}
      </div>
      <div className="flex flex-col gap-6 px-4 pt-4 pb-6">{children}</div>
    </div>
  );
}
