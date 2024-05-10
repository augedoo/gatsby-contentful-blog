import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { format } from "date-fns"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>No blog posts found. Add a post in your content dashboard.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.node.title || post.node.slug

          return (
            <li key={post.node.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.node.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>
                    {format(new Date(post.node.createdAt), "MMMM dd, yyyy")}
                  </small>
                </header>

                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.node.description,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          id
          slug
          subtitle
          title
          updatedAt
          createdAt
          image {
            url
          }
          content {
            raw
          }
        }
      }
    }
  }
`
