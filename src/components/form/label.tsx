interface Props {
  htmlFor: string;
  children: string;
}
export const Label = ({ htmlFor, children }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className='text-sm text-gray-600 mb-2'
    >
      {children}
    </label>
  );
};
