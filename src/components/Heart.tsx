import { useState } from "react";
import { HeartIcon } from "./utils/Icons";

export default function Heart() {
  const [count, setCount] = useState(100);
  return (
    <button
      onClick={() => setCount(count + 1)}
      className="group flex gap-1 font-mono text-sm opacity-90"
    >
      <HeartIcon className="group-hover:fill-foreground size-4 stroke-1" />
      {count}
    </button>
  );
}
