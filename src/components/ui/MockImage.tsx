type Props = {
  className?: string;
  text?: string;
};

export default function MockImage({ className = "", text = "" }: Props) {
  return (
    <div
      className={`${className} w-full h-full flex flex-col items-center justify-center bg-warm-200 border border-dashed border-brown-300`}
    >
      <svg
        className="w-8 h-8 text-brown-300 mb-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 16l5-5c.928-.893 2.072-.893 3 0l5 5" />
        <path d="M14 14l1-1c.928-.893 2.072-.893 3 0l3 3" />
        <circle cx="15.5" cy="9.5" r="1.5" />
      </svg>
      {text && (
        <span className="text-sm text-brown-400 tracking-[0.05em]">{text}</span>
      )}
    </div>
  );
}
