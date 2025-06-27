import Layout from '../../components/common/layout/Layout'
import About from './sections/about/About'
import Hero from './sections/hero/Hero'
import Services from './sections/services/Services'
import Specialists from './sections/specialists/Specialists'
import Testimonials from './sections/testimonials/Testimonials'

const Home = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Specialists />
      <Testimonials/>
    </Layout>
  )
}

export default Home
