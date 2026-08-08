import { useState } from 'react'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Capabilities from './components/Capabilities'
import Numbers from './components/Numbers'
import Building from './components/Building'
import ViewMap from './components/ViewMap'
import Floors from './components/Floors'
import Gallery from './components/Gallery'
import FooterCTA from './components/FooterCTA'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="site">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Nav />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Numbers />
        <Building />
        <ViewMap />
        <Floors />
        <Gallery />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
