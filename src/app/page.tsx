import { Button, Divider } from "antd";
import "./globals.css";
import Link from "next/link";
import dynamic from 'next/dynamic';
import TypeWriter from '../components/TypeWriter';

const Fireworks = dynamic(() => import('../components/Fireworks'), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <Fireworks />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative z-10">
        <div className="flex flex-col row-start-2 items-center sm:items-start">
          <div className="flex flex-col gap-3 row-start-2 items-start sm:items-start">
            <Link href="/love">
              <Button className="bg-[#20985e]" type="primary">
                wkt，Je t'aime❤
              </Button>
            </Link>
            <Link href="/forever">
              <Button className="bg-[#20985e]" type="primary">
                你是我永远期待的夏天❤
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
            <Divider className="bg-[#1f8e94]" dashed />
            <p className="testp2">
              <TypeWriter text='"最最喜欢你，wkt。"' />
            </p>
            <p className="white-text">"什么程度？"</p>
            <p className="white-text">"像喜欢春天的熊一样。"</p>
            <p className="white-text">"春天的熊？"，"什么春天的熊？"</p>
            <p className="white-text">
              "春天的原野里，你一个人正走着，对面走来一只可爱的小熊，浑身的毛活像天鹅绒，眼睛圆鼓鼓的。它这么对你说道：'你好，小姐，和我一块儿打滚玩好么？'接着，你就和小熊抱在一起，顺着长满三叶草的山坡咕噜咕噜滚下去，整整玩了一天。你说棒不棒？"
            </p>
            <p className="white-text">"太棒了。" "我就这么喜欢你。"</p>
          </div>
        </div>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </>
  );
}
