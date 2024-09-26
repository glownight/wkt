import Link from "next/link";
// import "../../app/globals.css";

export default function Index() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="spanTextCss">usesEffect首页</p>
        <Link href="/">
          {/* <Button className="bg-[#20985e]" type="primary"> */}
          <span className="spanTextCss">回到首页</span>
          {/* </Button> */}
        </Link>
        {/* <p className="testp2">“什么程度？”</p>
        <p>“像喜欢春天的熊一样。”</p>
        <p>“春天的熊？”绿子再次仰起脸，“什么春天的熊？”</p>
        <p>
          “春天的原野里，你一个人正走着，对面走来一只可爱的小熊，浑身的毛活像天鹅绒，眼睛圆鼓鼓的。它这么对你说道：‘你好，小姐，和我一块儿打滚玩好么？’接着，你就和小熊抱在一起，顺着长满三叶草的山坡咕噜咕噜滚下去，整整玩了一天。你说棒不棒？”
        </p>
        <p>“太棒了。” “我就这么喜欢你。”</p> */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
