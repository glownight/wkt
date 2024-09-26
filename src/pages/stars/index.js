import Link from "next/link";
import { Tag, Divider } from "antd";
import "../../app/globals.css";

export default function Index() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-left justify-items-left min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 row-start-2 items-center sm:items-start">
        <Divider className="lineColor" plain dashed orientation="center">
          React 单元测试
        </Divider>
        <Link href="/stars/demo/react/useState">
          <Tag className="spanTextCss" color="#2db7f5">
            useState 测试
          </Tag>
        </Link>
        <Link href="/stars/demo/react/useEffect">
          <Tag className="spanTextCss" color="#2db7f5">
            useEffect 测试
          </Tag>
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
