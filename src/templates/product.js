import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

const ProductPage = ({ data }) => {
  const { title, descriptionHtml, images, variants } = data.shopifyProduct
  return (
    <Layout>
      <h1>{title}</h1>
      <div>{descriptionHtml}</div>
      {images.map(image => (
        <Img
          style={{ maxWidth: `200px`, margin: `20px 0` }}
          fluid={image.localFile.childImageSharp.fluid}
          key={image.id}
          alt={title}
        />
      ))}
      <h2>Available In:</h2>
      <ul>
        {variants.map(variant => (
          <li key={variant.shopifyId}>{variant.title}</li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      descriptionHtml
      handle
      title
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      variants {
        title
        shopifyId
      }
    }
  }
`

export default ProductPage
