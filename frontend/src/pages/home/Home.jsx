import Layout from '../../components/common/layout/Layout'
import About from './sections/about/About'
import Hero from './sections/hero/Hero'
import Services from './sections/services/Services'

const Home = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Services/>
    </Layout>
  )
}

export default Home
