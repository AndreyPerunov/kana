import { RouletteControls } from "@/components/RouletteControls"
import { Stats } from "@/components/Stats"
import { Wrapper } from "@/components/Wrapper"

export default function Home() {
  return (
    <Wrapper>
      <RouletteControls className="mt-20" />
      <div className="flex justify-center">
        <Stats className="mt-10" />
      </div>
    </Wrapper>
  )
}
