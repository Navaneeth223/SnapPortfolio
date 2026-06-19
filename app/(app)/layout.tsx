import { redirect } from 'next/navigation';

// This would check authentication
async function getSession() {
  // TODO: Implement NextAuth session check
  // const session = await getServerSession();
  // return session;
  return null;
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Redirect to login if not authenticated
  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* App Shell - Header, Sidebar, etc. */}
      {children}
    </div>
  );
}
