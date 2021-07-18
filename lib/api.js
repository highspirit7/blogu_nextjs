import client, { previewClient } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `title, subtitle, 'slug': slug.current, date, coverImage,`;

const builder = imageUrlBuilder(client);
const getClient = (preview) => (preview ? previewClient : client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date desc) {${blogFields}}`,
  );
  return results;
}

export async function getPaginatedBlogs({ offset = 0, category = "All" }) {
  const sanity_groq =
    category === "All"
      ? `*[_type == "blog"] | order(date desc) {${blogFields}}[${offset}...${
          offset + 3
        }]`
      : `*[_type == "blog" && category->title == "${category}"] | order(date desc) {${blogFields}}[${offset}...${
          offset + 3
        }]`;
  const results = await client.fetch(sanity_groq);
  // console.log(sanity_groq);
  // console.log(results);
  return results;
}

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview);
  const result = await currentClient
    .fetch(
      `*[_type == "blog" && slug.current == $slug] {
      ${blogFields}
       content[]{..., "asset": asset->}
    }`,
      { slug },
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

  return result;
}

export async function getAllCategories() {
  const results = await client.fetch(`*[_type == "category"] | {title}`);

  return results;
}
