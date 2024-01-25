import React from "react";
import { Board } from "./Board";
import useStore from "../engine/store";
import { getVisibleIsometricGridCells } from "../engine/helpers";
import { useAnimationFrame } from "../hooks/useRequestAnimationFrame";

export function Viewport() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = React.useState<DOMRect>(null as unknown as DOMRect);
  const setScroll = useStore((state) => state.setScroll);
  const setViewport = useStore((state) => state.setViewport);
  const { width, height } = useStore((state) => state.gridSize);

  const gameLoop = React.useRef(useStore((state) => state.gameLoop));

  React.useEffect(
    () => useStore.subscribe((state) => (gameLoop.current = state.gameLoop)),
    [],
  );

  useAnimationFrame(gameLoop.current, true);

  const handleBoardScroll = () => {
    if (!rect) return;

    const scroll = getCurrentScroll();
    const viewport = getCurrentViewport(scroll);

    setViewport(viewport);
    setScroll(scroll);
  };

  const getCurrentScroll = () => {
    return {
      x: ref.current!.scrollLeft,
      y: ref.current!.scrollTop,
    };
  };

  const getCurrentViewport = (scroll: GameViewportScroll) => {
    const screen = {
      x1: scroll.x,
      y1: scroll.y - rect.top + 1,
      x2: rect.width + scroll.x,
      y2: rect.height + scroll.y,
    };

    const grid = getVisibleIsometricGridCells(screen, { width, height });

    return {
      ...grid,
      screen,
    };
  };

  React.useEffect(() => {
    setRect(ref.current!.getBoundingClientRect());
  }, []);

  React.useEffect(() => {
    if (!rect) return;

    handleBoardScroll();
  }, [rect]);

  React.useEffect(() => {
    if (ref.current) {
      const { offsetWidth, scrollWidth, offsetHeight, scrollHeight } =
        ref.current;

      ref.current.scrollTop = scrollHeight / 2 - offsetHeight / 2;
      ref.current.scrollLeft = scrollWidth / 2 - offsetWidth / 2;
    }
  }, [ref.current, width, height]);

  return (
    <div className={"container"}>
      <div className={"board-wrapper"} onScroll={handleBoardScroll} ref={ref}>
        <Board />
      </div>
    </div>
  );
}
