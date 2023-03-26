import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className=" bg-gray-900 px-2 py-2.5 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          {sessionData?.user.name}
        </span>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
            className="mr-2 rounded-full bg-white/10 px-5 py-2.5 text-center text-sm font-medium text-white"
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
          <img
            className="h-8 w-8 rounded-full"
            src={sessionData?.user.image ?? ""}
            alt="user photo"
          />
        </div>
      </div>
    </nav>
  );
};
