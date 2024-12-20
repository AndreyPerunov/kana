import Link from "next/link"
import { Wrapper } from "@/components/Wrapper"

export default function Home() {
  return (
    <Wrapper>
      <h1 className="text-4xl font-bold mb-8 text-primary">Learn Kana</h1>
      <p className="text-2xl text-passive mt-8">Master Japanese Kana effortlessly! Every guess helps you improve, bringing you closer to fluency. Using the Spaced Repetition system, it helps you focus on what needs practice making your journey fun and effective. Note that short daily sessions are more effective than trying to learn everything at once!</p>
      <div className="mt-8">
        <Link href="/select" className="text-2xl font-semibold rounded-xl py-5 px-10 shadow bg-primary text-white hover:bg-secondary">
          Start Learning
        </Link>
      </div>
      <div className="mt-8">
        <Link href="https://github.com/AndreyPerunov/kana/discussions/1" className="text-passive underline">
          I found a bug! / I have a suggestion! / I hate your app! / I love your app! (Leave a feedback)
        </Link>
      </div>
    </Wrapper>
  )
}
