import { RouletteControls } from "@/components/RouletteControls"
import { Stats } from "@/components/Stats"

export default function Home() {
  return (
    <>
      <RouletteControls className="mt-10" />
      <div className="flex justify-center">
        <Stats className="mt-10" />
      </div>
    </>
  )
}
