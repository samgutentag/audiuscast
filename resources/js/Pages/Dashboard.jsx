import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const projects = [
    {
        id: 1,
        title: "GraphQL API",
        initials: "GA",
        team: "Engineering",
        members: [
            {
                name: "Dries Vincent",
                handle: "driesvincent",
                imageUrl:
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Lindsay Walton",
                handle: "lindsaywalton",
                imageUrl:
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Courtney Henry",
                handle: "courtneyhenry",
                imageUrl:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Tom Cook",
                handle: "tomcook",
                imageUrl:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
        ],
        totalMembers: 12,
        lastUpdated: "March 17, 2020",
        pinned: true,
        bgColorClass: "bg-pink-600",
    },
    // More projects...
];

export default function Dashboard({ auth, podcast }) {
    const { data, setData, post, processing, errors } = useForm({
        url: "",
    });
    const hasPodcast = typeof podcast !== "undefined" && podcast !== null;
    function submitFeedForm(e) {
        e.preventDefault();
        post("/podcasts");
    }
    console.log(podcast);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <main className="lg:pl-72 h-screen">
                <div className="xl:pr-72">
                    {!hasPodcast && (
                        <>
                            <div className="h-screen">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                                        <div className="mx-auto max-w-2xl text-center">
                                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                                Let's link your podcast
                                            </h2>
                                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                                                Enter the RSS feed URL for your
                                                podcast to begin syncing your
                                                episodes with Audius.
                                            </p>
                                            <form
                                                onSubmit={submitFeedForm}
                                                className="mt-10 flex items-center justify-center gap-x-4"
                                            >
                                                <input
                                                    onChange={(e) =>
                                                        setData(
                                                            "url",
                                                            e.target.value
                                                        )
                                                    }
                                                    id="podcast-url"
                                                    name="url"
                                                    type="url"
                                                    value={data.url}
                                                    required
                                                    className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-audius-600 sm:text-sm sm:leading-6"
                                                    placeholder="Enter your podcast RSS feed URL"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="rounded-md bg-audius-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-audius-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-audius-600"
                                                >
                                                    <ArrowRightIcon className="h-5 w-5" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {hasPodcast && (
                        <div className="">
                            {/* Page title & actions */}
                            <div className="border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                                        {podcast.name}
                                    </h1>
                                </div>
                                <div className="mt-4 flex sm:ml-4 sm:mt-0">
                                    {/* <button
                                        type="button"
                                        className="sm:order-0 order-1 ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-0"
                                    >
                                        Share
                                    </button> */}
                                    <a
                                        href={
                                            "https://staging.audius.co/" +
                                            auth.user.audius_handle
                                        }
                                        target="_blank"
                                        className="order-0 inline-flex items-center rounded-md bg-audius-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-audius-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-audius-600 sm:order-1 sm:ml-3"
                                    >
                                        Listen
                                    </a>
                                </div>
                            </div>

                            {/* Episodes list (only on smallest breakpoint) */}
                            <div className="mt-10 sm:hidden">
                                <div className="px-4 sm:px-6">
                                    <h2 className="text-sm font-medium text-gray-900">
                                        Episodes
                                    </h2>
                                </div>
                                <ul
                                    role="list"
                                    className="mt-3 divide-y divide-gray-100 border-t border-gray-200"
                                >
                                    {podcast.items.map((episode) => (
                                        <li key={episode.guid}>
                                            <a
                                                href="#"
                                                className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                                            >
                                                <span className="flex items-center space-x-3 truncate">
                                                    <span
                                                        className={classNames(
                                                            "bg-audius-500",
                                                            "h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="truncate text-sm font-medium leading-6">
                                                        {episode.title}
                                                    </span>
                                                </span>
                                                <ChevronRightIcon
                                                    className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Episodes table (small breakpoint and up) */}
                            <div className="hidden sm:block">
                                <div className="inline-block min-w-full border-b border-gray-200 align-middle">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="border-t border-gray-200">
                                                <th
                                                    className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                                    scope="col"
                                                >
                                                    <span className="lg:pl-2">
                                                        Episode
                                                    </span>
                                                </th>
                                                <th
                                                    className="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                                                    scope="col"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                                                    scope="col"
                                                />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            {podcast.items.map((episode) => (
                                                <tr key={episode.guid}>
                                                    <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                                                        <div className="flex items-center space-x-3 lg:pl-2">
                                                            <div
                                                                className={classNames(
                                                                    "bg-audius-500",
                                                                    "h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                            <a
                                                                href={
                                                                    episode.audius_url
                                                                }
                                                                className="truncate hover:text-gray-600"
                                                            >
                                                                {episode.title}
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="hidden capitalize whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                                                        {episode.status}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                                                        {!episode.has_sync && (
                                                            <a
                                                                href="#"
                                                                className="text-audius-600 hover:text-audius-900"
                                                            >
                                                                Sync to Audius
                                                            </a>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <aside className="fixed top-0 inset-y-0 right-0 hidden w-72 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                {/* Secondary column (hidden on smaller screens) */}
            </aside>
        </AuthenticatedLayout>
    );
}
