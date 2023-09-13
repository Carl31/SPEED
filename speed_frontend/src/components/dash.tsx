'use client';

import { UserSVG, MailSVG } from "../components/svgs";
import { signOut, useSession } from "next-auth/react";

type User =
  | {
      firstName?: string | null | undefined;
      lastName?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
};

export default function Dash({ user }: Props) {
  return (
    <section id="dash" className="w-full grid grid-cols-3">
      <div className="flex justify-start">
        <button className="m-5">
          <MailSVG />
        </button>
      </div>

      <p className="inline-flex items-center justify-center font-bold text-2xl underline">
        SPEED Dashboard
      </p>

      <div className="flex justify-end">
        <button className="m-5" onClick={ () => signOut() }>
          <UserSVG />
          {/* <p>{user?.firstName}</p> */}
        </button>
      </div>
    </section>
  );
}
