const PROJECT_ID = "a8mburr3";
const DATASET = "production";
const API_VERSION = "2024-01-01";

const SANITY_API_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

export interface SanityCategory {
  title: string;
  slug?: { current: string };
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  body?: any[];
  categories?: SanityCategory[];
}

export interface SanityPostDetail extends SanityPost {
  body: any[];
  categories?: SanityCategory[];
}

// Convert Sanity image reference to URL
export const urlFor = (ref: string): string => {
  if (!ref) return "/placeholder.svg";
  const [, id, dimensions, format] = ref.split("-");
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`;
};

// Fetch all posts
export const fetchPosts = async (): Promise<SanityPost[]> => {
  const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage
  }`);

  const response = await fetch(`${SANITY_API_URL}?query=${query}`);
  const data = await response.json();
  return data.result || [];
};

// Fetch single post by slug
export const fetchPostBySlug = async (slug: string): Promise<SanityPostDetail | null> => {
  const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    "categories": categories[]->{ title, slug }
  }`);

  const response = await fetch(`${SANITY_API_URL}?query=${query}`);
  const data = await response.json();
  return data.result || null;
};
