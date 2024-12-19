import { RouletteControls } from "@/components/RouletteControls"
import { Stats } from "@/components/Stats"
import { Wrapper } from "@/components/Wrapper"

export default function Home() {
  return (
    <Wrapper>
      <RouletteControls className="mt-10" />
      <Stats className="mt-10" />
      <p className="text-2xl text-passive mt-10">Master Japanese Kana effortlessly! Every guess helps you improve, bringing you closer to fluency. Using the Spaced Repetition system, it helps you focus on what needs practice making your journey fun and effective. Note that short daily sessions are more effective than trying to learn everything at once!</p>
    </Wrapper>
  )
}
