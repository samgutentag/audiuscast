import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    ArrowRightIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Bars3Icon,
    ChevronRightIcon,
    ChevronUpDownIcon,
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

const navigation = [
    { name: "Podcast", href: "#", icon: SignalIcon, current: true },
    { name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
];
const teams = [
    { id: 1, name: "Planetaria", href: "#", initial: "P", current: false },
    { id: 2, name: "Protocol", href: "#", initial: "P", current: false },
    { id: 3, name: "Tailwind Labs", href: "#", initial: "T", current: false },
];
const statuses = {
    offline: "text-gray-500 bg-audius-100/10",
    online: "text-green-400 bg-green-400/10",
    error: "text-rose-400 bg-rose-400/10",
};
const environments = {
    Preview: "text-gray-400 bg-audius-400/10 ring-gray-400/20",
    Production: "text-audius-400 bg-audius-400/10 ring-audius-400/30",
};
const deployments = [
    {
        id: 1,
        href: "#",
        projectName: "ios-app",
        teamName: "Planetaria",
        status: "offline",
        statusText: "Initiated 1m 32s ago",
        description: "Deploys from GitHub",
        environment: "Preview",
    },
    // More deployments...
];
const activityItems = [
    {
        user: {
            name: "Michael Foster",
            imageUrl:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        projectName: "ios-app",
        commit: "2d89f0c8",
        branch: "main",
        date: "1h",
        dateTime: "2023-01-23T11:00",
    },
    // More items...
];

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
const pinnedProjects = projects.filter((project) => project.pinned);

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export default function Authenticated({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const hasPodcast = false;
    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=audius&shade=600"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul
                                                role="list"
                                                className="flex flex-1 flex-col gap-y-7"
                                            >
                                                <li>
                                                    <ul
                                                        role="list"
                                                        className="-mx-2 space-y-1"
                                                    >
                                                        {navigation.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className={classNames(
                                                                            item.current
                                                                                ? "bg-gray-50 text-audius-600"
                                                                                : "text-gray-700 hover:text-audius-600 hover:bg-gray-50",
                                                                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                        )}
                                                                    >
                                                                        <item.icon
                                                                            className={classNames(
                                                                                item.current
                                                                                    ? "text-audius-600"
                                                                                    : "text-gray-400 group-hover:text-audius-600",
                                                                                "h-6 w-6 shrink-0"
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <div className="flex lg:flex-1">
                                <a
                                    href="#"
                                    className="-m-1.5 p-1.5 flex items-center"
                                >
                                    <img
                                        src="https://thegivingblock.com/wp-content/uploads/2021/11/AudiusCoinLogo_2x.png"
                                        className="h-8 mr-2"
                                    />
                                    <span className="font-bold inline-block text-xl">
                                        AudiusCast
                                    </span>
                                </a>
                            </div>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-50 text-audius-600"
                                                            : "text-gray-700 hover:text-audius-600 hover:bg-gray-50",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current
                                                                ? "text-audius-600"
                                                                : "text-gray-400 group-hover:text-audius-600",
                                                            "h-6 w-6 shrink-0"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <li className="-mx-6 mt-auto">
                                    <a
                                        href="#"
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className="sr-only">
                                            Your profile
                                        </span>
                                        <span aria-hidden="true">Tom Cook</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
                        Dashboard
                    </div>
                    <a href="#">
                        <span className="sr-only">Your profile</span>
                        <img
                            className="h-8 w-8 rounded-full bg-gray-50"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                    </a>
                </div>

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
                                                    Enter the RSS feed URL for
                                                    your podcast to begin
                                                    syncing your episodes with
                                                    Audius.
                                                </p>
                                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                                    <input
                                                        id="podcast-url"
                                                        name="url"
                                                        type="url"
                                                        required
                                                        className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-audius-600 sm:text-sm sm:leading-6"
                                                        placeholder="Enter your podcast RSS feed URL"
                                                    />
                                                    <a
                                                        href="#"
                                                        className="rounded-md bg-audius-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-audius-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-audius-600"
                                                    >
                                                        <ArrowRightIcon className="h-5 w-5" />
                                                    </a>
                                                </div>
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
                                            Home
                                        </h1>
                                    </div>
                                    <div className="mt-4 flex sm:ml-4 sm:mt-0">
                                        <button
                                            type="button"
                                            className="sm:order-0 order-1 ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-0"
                                        >
                                            Share
                                        </button>
                                        <button
                                            type="button"
                                            className="order-0 inline-flex items-center rounded-md bg-audius-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-audius-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-audius-600 sm:order-1 sm:ml-3"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                                {/* Pinned projects */}
                                {/* <div className="mt-6 px-4 sm:px-6 lg:px-8"></div> */}

                                {/* Projects list (only on smallest breakpoint) */}
                                <div className="mt-10 sm:hidden">
                                    <div className="px-4 sm:px-6">
                                        <h2 className="text-sm font-medium text-gray-900">
                                            Projects
                                        </h2>
                                    </div>
                                    <ul
                                        role="list"
                                        className="mt-3 divide-y divide-gray-100 border-t border-gray-200"
                                    >
                                        {projects.map((project) => (
                                            <li key={project.id}>
                                                <a
                                                    href="#"
                                                    className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                                                >
                                                    <span className="flex items-center space-x-3 truncate">
                                                        <span
                                                            className={classNames(
                                                                project.bgColorClass,
                                                                "h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        <span className="truncate text-sm font-medium leading-6">
                                                            {project.title}{" "}
                                                            <span className="truncate font-normal text-gray-500">
                                                                in{" "}
                                                                {project.team}
                                                            </span>
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

                                {/* Projects table (small breakpoint and up) */}
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
                                                            Project
                                                        </span>
                                                    </th>
                                                    <th
                                                        className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                                        scope="col"
                                                    >
                                                        Members
                                                    </th>
                                                    <th
                                                        className="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                                                        scope="col"
                                                    >
                                                        Last updated
                                                    </th>
                                                    <th
                                                        className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                                                        scope="col"
                                                    />
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 bg-white">
                                                {projects.map((project) => (
                                                    <tr key={project.id}>
                                                        <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                                                            <div className="flex items-center space-x-3 lg:pl-2">
                                                                <div
                                                                    className={classNames(
                                                                        project.bgColorClass,
                                                                        "h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                <a
                                                                    href="#"
                                                                    className="truncate hover:text-gray-600"
                                                                >
                                                                    <span>
                                                                        {
                                                                            project.title
                                                                        }{" "}
                                                                        <span className="font-normal text-gray-500">
                                                                            in{" "}
                                                                            {
                                                                                project.team
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-3 text-sm font-medium text-gray-500">
                                                            <div className="flex items-center space-x-2">
                                                                <div className="flex flex-shrink-0 -space-x-1">
                                                                    {project.members.map(
                                                                        (
                                                                            member
                                                                        ) => (
                                                                            <img
                                                                                key={
                                                                                    member.handle
                                                                                }
                                                                                className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                                                                                src={
                                                                                    member.imageUrl
                                                                                }
                                                                                alt={
                                                                                    member.name
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                                {project.totalMembers >
                                                                project.members
                                                                    .length ? (
                                                                    <span className="flex-shrink-0 text-xs font-medium leading-5">
                                                                        +
                                                                        {project.totalMembers -
                                                                            project
                                                                                .members
                                                                                .length}
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                        </td>
                                                        <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                                                            {
                                                                project.lastUpdated
                                                            }
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                                                            <a
                                                                href="#"
                                                                className="text-audius-600 hover:text-audius-900"
                                                            >
                                                                Edit
                                                            </a>
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
            </div>
        </>
    );
}
