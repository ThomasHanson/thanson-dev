import Page from "components/Page";

export default function Home() {
  return (
    <>
      <Page>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-gray-700 via-gray-900 to-black">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Thomas Hanson
            </h1>
          </div>
        </main>
      </Page>
    </>
  );
}
