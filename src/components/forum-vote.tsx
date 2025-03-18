import { useState } from "react";
import { Button } from "./ui/button";
import { actions } from "astro:actions";

export default function ForumVote({ postId, votes, size = null }: { postId: string, votes: number, size?: "xl" | null }) {
  const [userVote, setUserVote] = useState(0);
  return <><Button
    variant="ghost"
    size="sm"
    className="h-auto px-2 text-lg font-bold"
    onClick={() => {
      setUserVote(v => {
        const val = v ? 0 : 1;
        actions.vote({ postId, vote: val }).then(({ error }) => {
          if (error) {
            console.log(error);
            setUserVote(v);
          }
        });
        return val;
      });
    }}
  >
    ▲
  </Button>
    <span className={"font-bold my-1 " + size === "xl" ? "text-xl" : ""}>{votes + userVote}</span>
    <Button
      variant="ghost"
      size="sm"
      className="h-auto px-2 text-lg font-bold"
      onClick={() => {
        setUserVote(v => {
          const val = v ? 0 : -1
          actions.vote({ postId, vote: val }).then(({ error }) => {
            if (error) {
              console.log(error);
              setUserVote(v);
            }
          });
          return val;
        });
      }}
    >
      ▼
    </Button></>
}