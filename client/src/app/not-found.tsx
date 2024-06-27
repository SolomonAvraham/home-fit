 
export default function NotFound() {
  return (
    <div className=" flex h-screen flex-col items-center justify-center bg-admin font-extrabold text-slate-800 drop-shadow-xl">
       <h2 className="sAndM:text-7xl mt-10 rounded-3xl border-2 border-black  bg-white p-3 text-4xl">
        שגיאה 404
        <hr className="hrTop" />
      </h2>
      <h2 className="sAndM:text-4xl mb-16 mt-4 rounded-3xl border-2 border-black bg-white p-3 text-2xl">
        דף לא נמצא
        <hr className="hrTop" />
      </h2>
    </div>
  );
}
