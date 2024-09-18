import Creator from "../Home/Creator"
import Devotional from "../Home/Devotional"
import Hero from "../Home/Hero"
import Trending from "../Home/Trending"


function Home() {
  return (
    <div><Hero/>
    <Trending/>
    <Devotional/>
    <Creator/>
    </div>
  )
}

export default Home