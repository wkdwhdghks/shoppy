export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: any;
}): JSX.Element {
  return (
    <button
      className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
