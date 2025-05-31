import React from 'react'
import Form from './components/form/Form'
import Layout from '../../components/common/layout/Layout'
import Product from './components/products/Product'

const Admin = () => {
  return (
    <Layout>
      <Form />
      <Product/>
    </Layout>
  )
}

export default Admin
