import { Select } from "@/components/Select"
import { Wrapper } from "@/components/Wrapper"
import Link from "next/link"

export default function SelectPage() {
  return (
    <Wrapper>
      <h1 className="text-4xl text-center mt-16 text-passive font-semibold">Select characters you want to learn</h1>
      <h1 className="text-4xl text-center mt-8 text-passive font-semibold"> and </h1>
      <div className="flex justify-center mt-8">
        <Link href="/learn" className="text-5xl font-semibold rounded-xl py-5 px-10 shadow bg-primary text-white">
          Start Practicing!
        </Link>
      </div>
      <Select className="mt-10" />
    </Wrapper>
  )
}
