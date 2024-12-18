import { RouletteControls } from "@/components/RouletteControls"
import { Stats } from "@/components/Stats"
import { Wrapper } from "@/components/Wrapper"

export default function Home() {
  return (
    <Wrapper>
      <RouletteControls className="mt-10" />
      <div className="flex justify-center">
        <Stats className="mt-10" />
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptatem obcaecati amet non asperiores minima fugit neque autem laudantium iusto perspiciatis unde fuga dolorem, eius libero doloremque, eligendi rerum optio. Perspiciatis, nesciunt a illum dolorem aperiam voluptate soluta facilis tenetur ipsa doloribus reprehenderit sed consequuntur ullam fugit excepturi corporis alias sapiente error ipsam! Impedit ipsam eos exercitationem molestiae rem maxime!</p>
    </Wrapper>
  )
}
