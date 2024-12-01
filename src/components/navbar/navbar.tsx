import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React from "react";
import { SiNextdotjs } from "react-icons/si";

export default function Navbar() {
  return (
    <nav className="fixed top-0 flex w-full justify-between border border-b-[1px] border-white/20 bg-white/30 pr-2 shadow-lg backdrop-blur-md">
      <div className="logo my-2 flex min-h-10 items-center gap-2 border-zinc-400 pl-2 text-xl font-semibold">
        <img
          width={50}
          src="/Civil_Service_University_(Ethiopia).png"
          alt="civil service logo"
        />
        Civil Service
      </div>

      <HoverCard>
        <HoverCardTrigger className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <p>Powered by</p>
            <SiNextdotjs size={25} />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="mr-2">
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
    </nav>
  );
}
