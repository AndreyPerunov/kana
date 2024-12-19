import Link from "next/link"
import { BiSolidSelectMultiple, BiSolidHome } from "react-icons/bi"
import { IoIosSettings } from "react-icons/io"
import { SettingsButton } from "@/components/SettingsButton"

export const LearnNav = () => {
  return (
    <nav className="flex justify-center gap-10 mt-10">
      <Link href="/" title="Home" className="group">
        <BiSolidHome className="size-10 text-secondary transition-all group-hover:text-primary group-hover:animate-pulse group-focus-within:text-primary group-focus-within:animate-pulse" />
      </Link>
      <Link href="/select" title="Select characters to learn" className="group">
        <BiSolidSelectMultiple className="size-10 text-secondary transition-all group-hover:text-primary group-hover:animate-pulse group-focus-within:text-primary group-focus-within:animate-pulse" />
      </Link>

      <SettingsButton>
        <IoIosSettings className="size-10 text-secondary transition-all group-hover:text-primary group-hover:rotate-180 group-focus-within:rotate-180 group-hover:animate-pulse group-focus-within:text-primary group-focus-within:animate-pulse" />
      </SettingsButton>
    </nav>
  )
}
