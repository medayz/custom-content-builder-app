import type { V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getClient } from "lib/sanity";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const pageSlugs = `*[_type == "page"]{
  _id, slug, title
}`


export const loader = async () => {
  type Page = {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
  const pages: Page[] = await getClient().fetch(pageSlugs)

  return { slugs: pages.map(({ _id, slug, title }) => ({ _id, title, slug: slug.current })) }
}

export default function Index() {
  const { slugs } = useLoaderData<{ slugs: { _id: string, title: string, slug: string }[] }>();

  return (
    <main className="flex items-center justify-center min-h-screen">
      <ul>
        {slugs.map(({ _id, title, slug }) => (
          <li key={_id}>
            <Link to={`/${slug}`}>{title}</Link>
          </li>)
        )}
      </ul>
    </main>
  );
}
