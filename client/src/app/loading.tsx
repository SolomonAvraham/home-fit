export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen fixed inset-0 z-50 top-0 bottom-0 left-0 right-0 opacity-30 bg-white backdrop-blur-sm">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
    </div>
  );
}
