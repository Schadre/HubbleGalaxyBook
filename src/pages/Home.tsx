import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { useHubbleMedia } from "../hooks/useHubbleMedia";

export default function Home() {
  const { data, loading, error } = useHubbleMedia();
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const book = bookRef.current?.pageFlip()
    if (!book) return;

    const onFlip = () => setPage(book.getCurrentPageIndex());
    book.on("flip", onFlip);

    return () => {
      book.off("flip", onFlip);
    };
  }, []);

  if (loading)
    return <p className="text-center mt-10">🚀Loading Hubble images...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error} </p>;
  if (!data || data.length === 0)
    return <p className="text-center mt-10">No Hubble images found</p>;

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center p-6">
      <div className="flex flex-col justify-center items-start gap-8 w-full max-w-[1200px]">
        <div className="w-64 flex flex-col text-stone-300 space-y-4"></div>
      </div>
      <HTMLFlipBook
        width={500}
        height={700}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        drawShadow
        maxShadowOpacity={0.5}
        className="shadow-2xl rounded-2xl bg-stone-900"
        ref={bookRef}
        showCover={true}
        onFlip={() => setPage(bookRef.current.pageFlip().getCurrentPageIndex())}
      >
        <div className="flex flex-col items-center justify-center p-10 text-center bg-gradient-to-b from-stone-950 to-stone-900 rounded-2xl">
          <h2 className="text-4xl font-extrabold m-4">🌌 Hubble Galaxy Book</h2>
          <p className="text-stone-400 font-bold">Tech Stack:</p>
          <ul className="text-stone-400">
            <li>⚛️ React</li>
            <li>📝 TypeScript</li>
            <li>🎨 Tailwind CSS</li>
            <li>📖 HTMLFlipBook</li>
            <li>⚡ Vite</li>
            <li>🪐 Hubble API</li>
            <li>☁️ AWS Amplify</li>
          </ul>
          <p className="p-4 text-xl">
            Click to open the book to explore the cosmos!
          </p>
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col h-full p-4 text-center bg-stone-900 rounded-2xl border border-stone-800 shadow-inner overflow-hidden p-6"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2 px-4 leading-snug break-words">
              {item.title}
            </h2>

            <div className="flex-grow min-h-0 flex items-center justify-center w-full">
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="rounded-2xl shadow-lg max-h-[60%] max-w-[90%] object-contain mx-auto"
              />
            </div>

            <div className="flex-grow flex items-center justify-center px-4 py-4">
              <p className="text-stone-300 text-xs leading-tight line-clamp-5 md:line-clamp-none md:overflow-y-visible overflow-y-auto max-h-[120px] md:max-h-none">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </HTMLFlipBook>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          className="px-4 py-2 bg-stone-700 rounded hover:bg-stone-600"
          aria-label="Previous page"
        >
          Previous
        </button>
        <button
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          className="px-4 py-2 bg-stone-700 rounded hover:bg-stone-600"
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      <p className="mt-2 text-sm text-stone-400">
        Page {page + 1} / {data.length + 1}
      </p>
    </div>
  );
}
