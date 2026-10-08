type InputWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export default function InputWrapper({ title, children }: InputWrapperProps) {
  return (
    <div className="border border-gray-300">
      <div className="text-sm font-bold bg-gray-200 p-4">
        <p>{title}</p>
      </div>
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </div>
  );
}
