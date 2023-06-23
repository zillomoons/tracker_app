import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import cn from "~/utils/cn";
import { type Session } from "next-auth/core/types";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#", action: () => signOut() },
];

export const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 font-bold text-white">
            Habit Tracker
          </div>
          <div>
            <div className="ml-4 flex items-center md:ml-6">
              {sessionData?.user ? (
                <UserAvatar user={sessionData?.user} />
              ) : (
                <button
                  type="button"
                  onClick={() => void signIn()}
                  className="mr-2 rounded-full bg-white/10 px-5 py-2.5 text-center text-sm font-medium text-white"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const UserAvatar = ({ user }: { user: Session["user"] }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user.image ?? "./images/abstract-user.svg"}
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <div
                  onClick={item.action}
                  className={cn(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
