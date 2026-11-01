import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import UpcomingEventDetailsClient from "./UpcmoingEventDetails";


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpcomingEventDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <UpcomingEventDetailsClient
      eventId={id}
      initialUser={session?.user ?? null}
    />
  );
}