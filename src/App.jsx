import { useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import BannerGancho from './components/BannerGancho'
import SectionTime from './components/sections/SectionTime'
import SectionGender from './components/sections/SectionGender'
import SectionMobility from './components/sections/SectionMobility'
import SectionCareerPath from './components/sections/SectionCareerPath'
import SectionEducation from './components/sections/SectionEducation'
import SectionCantera from './components/sections/SectionCantera'
import SectionIndustry from './components/sections/SectionIndustry'
import SectionSkills from './components/sections/SectionSkills'
import SectionSynthesis from './components/sections/SectionSynthesis'
import Calculator from './components/calculator/Calculator'
import Footer from './components/Footer'

export default function App() {
  const calcRef = useRef(null)

  const scrollToCalc = () => {
    calcRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="font-sans">
      <Nav onCTA={scrollToCalc} />
      <Hero onCTA={scrollToCalc} />
      <BannerGancho />
      <SectionTime />
      <SectionGender />
      <SectionMobility />
      <SectionCareerPath />
      <SectionEducation />
      <SectionCantera />
      <SectionIndustry />
      <SectionSkills />
      <SectionSynthesis onCTA={scrollToCalc} />
      <div ref={calcRef} id="calculadora">
        <Calculator />
      </div>
      <Footer />
    </div>
  )
}
