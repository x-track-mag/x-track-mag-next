# Static Content Repository

This is where the actual content is stored, after extraction from the CMS.
We want to use a local directory synced in git to serve the data in the format that we wish, not the sometimes convoluted data that is directly accessible from the CMSs APIs (May it be Contentful, Prismic or other Headless CMS)

The files are stored here in JSON format. It could as well be Markdown + Front Matter but when the structure of the data is deeply nested (like when we use sections) JSON becomes more readable than YAML Front Matter.

For serving dynamic content like on the Home with the Infinite Scroller that recycles out of view sections to load new ones, we call our local API, which API has previously loaded the static content in this directory.
