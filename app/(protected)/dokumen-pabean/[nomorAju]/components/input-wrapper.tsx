type InputWrapperProps = {
  title: string;
  headerChildren?: React.ReactNode;
  children: React.ReactNode;
};

export default function InputWrapper({
  title,
  headerChildren,
  children,
}: InputWrapperProps) {
  return (
    <div className="w-full h-fit border border-gray-300">
      <div className="w-full flex justify-between bg-gray-200">
        <div className="text-sm font-bold p-4">
          <p>{title}</p>
        </div>
        {headerChildren}
      </div>
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </div>
  );
}
