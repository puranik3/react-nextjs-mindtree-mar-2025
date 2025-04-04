"use client";

import {
    HydrationBoundary,
    HydrationBoundaryProps,
} from "@tanstack/react-query";

type Props = HydrationBoundaryProps & {
    children: React.ReactNode;
};

export default function HydrateClient({ children, ...props }: Props) {
    return <HydrationBoundary {...props}>{children}</HydrationBoundary>;
}

// // what we use...
// <HydrateClient x={100}>
//     <div>Hello</div>
//     <p>para</p>
// </HydrateClient>

// // we get....
// <HydrationBoundary x={100}>
//    <div>Hello</div>
//    <p>para</p>
// </HydrationBoundary>