import { RouletteControls } from "@/components/RouletteControls"
import { Stats } from "@/components/Stats"

export default function Home() {
  return (
    <div>
      <RouletteControls />
      <Stats className="mt-10" />
    </div>
  )
}
