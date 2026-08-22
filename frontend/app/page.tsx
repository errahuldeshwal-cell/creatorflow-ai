export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">

      <div className="max-w-4xl text-center">

        <h1 className="text-5xl font-bold mb-6">
          Mission IG Follower
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Your AI powered Instagram growth assistant.
          Analyze, optimize and grow your Instagram presence.
        </p>

        <div className="flex justify-center gap-4">

          <a
            href="/auth/instagram"
            className="px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-700 transition"
          >
            Connect Instagram
          </a>

          <a
            href="/dashboard"
            className="px-8 py-3 rounded-full border border-gray-500 hover:bg-gray-800 transition"
          >
            Dashboard
          </a>

        </div>

      </div>

    </main>
  );
}