# Buffalo

## Instructions

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/zellwk/buffalo
">
  <img src="https://www.netlify.com/img/deploy/button.svg" alt="Netlify button" >
</a>

## Deploy to Netlify

TODO items:
1. Style Convertkit
2. Create videos to teach people how to use Buffalo
  1. Welcome + Why buffalo
  2. Deployment
     1. Click Deploy to Netlify button
     2. Wait...
     3. Netlify website
     4. Custom Domain
  3. Installing
     1. Git clone repository
     2. cd to repository
     3. `npm install`
     4. `npm run dev`
     5. See `localhost:3000`.
  4. Usage
     1. Change `src/_data/site.json`
     2. Writing posts
        1. Markdown syntax
        2. Metadata
           1. file name
           2. title
           3. description
           4. slug
           5. newsletter
           6. Excerpt
           7. Previous/Next links automatically
           8. Series of articles
        3. Automatically archived into Tags
        4. RSS Feed provided for posts
     3. Writing pages
        1. Markdown syntax
        2. Metadata
           1. Title
           2. Description
           3. YAML
              1. nav
              2. footer
              3. newsletter
           4. URL structure
        3. Contact Form
     4. Custom styling and custom JavaScript
        1. `src/scss/styles.scss`
        2. `src/js/main.js`
     5. Advanced usage
        1. Layouts + includes. Quite advanced so I might create a course that explains how to use Eleventy and Nunjucks and Markdown at the same time.

Feel free to file a PR if you want to help improve this project. :)
