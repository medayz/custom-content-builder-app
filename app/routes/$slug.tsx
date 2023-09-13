import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getClient } from "lib/sanity";

export type Page = {
    _id: string
}

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
    const pageQuery = `*[_type == "page" && slug.current == $slug][0]`
    const currentPage: Page = await getClient().fetch(pageQuery, { slug: params.slug })

    if (!currentPage) {
        throw new Response(null, {
            status: 404,
            statusText: "Not Found",
        });
    }

    return { currentPage }
};

export default function Page() {
    const { currentPage } = useLoaderData();

    return (
        <main>
            <pre>
                {JSON.stringify(currentPage, null, 2)}
            </pre>
        </main>
    )
}
