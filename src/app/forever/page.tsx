import "../../app/globals.css";
import dynamic from "next/dynamic";
import TypeWriter from '../../components/TypeWriter';

const Fireworks = dynamic(() => import("../../components/Fireworks"), {
  ssr: false,
});

export default function Forever() {
  return (
    <>
      <Fireworks />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 pb-16 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="japanese-pattern" />
        <main className="flex flex-col gap-10 row-start-2 items-start max-w-[90%] w-full">
          <p className="quote-text w-full !p-0">
            『星星真美，因为有一朵看不见的花。』
          </p>
          <p className="testp2 w-full !p-0">
            <TypeWriter text="『感谢上天让我遇见你。』" />
          </p>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </>
  );
}
