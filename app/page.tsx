import Link from "next/link"
import { Wrapper } from "@/components/Wrapper"

export default function Home() {
  return (
    <Wrapper>
      <h1>Home</h1>
      <Link href="/learn">Learn</Link>
    </Wrapper>
  )
}
