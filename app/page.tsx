import About from '@/components/About'
import Benefits from '@/components/Benefits'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import { HeroSectionDemo } from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Programs from '@/components/Programs'

const page = () => {
  return (
    <>
        <Navbar/>

    <HeroSectionDemo/>
    <About/>
    <Programs/>
    <Benefits/>
    <Gallery/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default page