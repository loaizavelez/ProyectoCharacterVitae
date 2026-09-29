export default function Button({ children, type = 'button', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-3 px-4 flex justify-center text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors shadow-lg shadow-indigo-500/20"
    >
      {children}
    </button>
  );
}