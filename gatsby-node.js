// https://www.gatsbyjs.org/docs/node-apis/
 
const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
    const {createPage} = boundActionCreators

    const postTemplate = path.resolve(`src/templates/post.js`)


    //this is where posts can be sorted or limited
    return graphql(`{
        allMarkdownRemark {
            edges {
                node {
                    html
                    id
                    frontmatter {
                        path
                        title
                        date(formatString: "MM.DD.YYYY")
                        tags
                        excerpt
                    }
                }
            }
        }
    }`)
    .then(res => {
        if (res.errors){
            return Promise.reject(res.errors)
        }

        res.data.allMarkdownRemark.edges.forEach( ({node}) => {
            createPages({
                path: node.frontmatter.path,
                component: postTemplate
            })
        })

    })
} 