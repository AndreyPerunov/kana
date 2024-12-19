import { RouletteControls } from "@/components/RouletteControls"
import { Stats } from "@/components/Stats"
import { Wrapper } from "@/components/Wrapper"

export default function Home() {
  return (
    <Wrapper>
      <RouletteControls className="mt-10" />
      <Stats className="mt-10" />
    </Wrapper>
  )
}
