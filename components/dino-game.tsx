"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const CANVAS_W = 600;
const CANVAS_H = 150;
const GROUND_Y = 120;
const DINO_W = 20;
const DINO_H = 22;
const GRAVITY = 0.6;
const JUMP_FORCE = -10;
const CACTUS_W = 12;
const CACTUS_MIN_H = 20;
const CACTUS_MAX_H = 36;
const INITIAL_SPEED = 3;
const SPEED_INCREMENT = 0.001;

interface Cactus {
  x: number;
  h: number;
}

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const dinoY = useRef(GROUND_Y - DINO_H);
  const velocity = useRef(0);
  const isJumping = useRef(false);
  const cacti = useRef<Cactus[]>([]);
  const speed = useRef(INITIAL_SPEED);
  const frameCount = useRef(0);
  const scoreRef = useRef(0);
  const gameStateRef = useRef(gameState);
  const isDucking = useRef(false);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const stored = localStorage.getItem("dino-high-score");
    if (stored) setHighScore(parseInt(stored));
  }, []);

  const jump = useCallback(() => {
    if (gameStateRef.current === "idle") {
      setGameState("playing");
      gameStateRef.current = "playing";
      cacti.current = [];
      speed.current = INITIAL_SPEED;
      frameCount.current = 0;
      scoreRef.current = 0;
      setScore(0);
      dinoY.current = GROUND_Y - DINO_H;
      velocity.current = 0;
      isJumping.current = false;
    }

    if (gameStateRef.current === "over") {
      setGameState("playing");
      gameStateRef.current = "playing";
      cacti.current = [];
      speed.current = INITIAL_SPEED;
      frameCount.current = 0;
      scoreRef.current = 0;
      setScore(0);
      dinoY.current = GROUND_Y - DINO_H;
      velocity.current = 0;
      isJumping.current = false;
      return;
    }

    if (!isJumping.current) {
      velocity.current = JUMP_FORCE;
      isJumping.current = true;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      if (e.code === "ArrowDown") {
        isDucking.current = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") {
        isDucking.current = false;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        bg: "transparent",
        dino: isDark ? "#228df2" : "#181818",
        cactus: isDark ? "#a6a6a6" : "#7b7b7b",
        ground: isDark ? "#383838" : "#e0e0e0",
        text: isDark ? "#a6a6a6" : "#7b7b7b",
        gameOver: isDark ? "#228df2" : "#181818",
      };
    };

    const drawDino = (colors: ReturnType<typeof getColors>) => {
      const y = dinoY.current;
      const h = isDucking.current ? DINO_H * 0.6 : DINO_H;

      ctx.fillStyle = colors.dino;

      const bx = 50;
      const by = isDucking.current ? GROUND_Y - h : y;
      ctx.fillRect(bx, by, DINO_W, h);
      ctx.fillRect(bx + 8, by - 8, 14, 10);

      ctx.fillStyle = gameStateRef.current === "over" ? "#f14c4c" : (document.documentElement.classList.contains("dark") ? "#181818" : "#f5f5f5");
      ctx.fillRect(bx + 17, by - 5, 3, 3);

      ctx.fillStyle = colors.dino;
      if (isJumping.current) {
        ctx.fillRect(bx + 3, by + h, 4, 6);
        ctx.fillRect(bx + 12, by + h, 4, 6);
      } else {
        const legFrame = Math.floor(frameCount.current / 6) % 2;
        if (legFrame === 0) {
          ctx.fillRect(bx + 3, by + h, 4, 8);
          ctx.fillRect(bx + 12, by + h, 4, 4);
        } else {
          ctx.fillRect(bx + 3, by + h, 4, 4);
          ctx.fillRect(bx + 12, by + h, 4, 8);
        }
      }

      ctx.fillRect(bx - 6, by + 4, 8, 4);
      ctx.fillRect(bx - 10, by + 2, 6, 3);
    };

    const drawCactus = (c: Cactus, colors: ReturnType<typeof getColors>) => {
      ctx.fillStyle = colors.cactus;
      ctx.fillRect(c.x, GROUND_Y - c.h, CACTUS_W, c.h);
      if (c.h > 25) {
        ctx.fillRect(c.x - 5, GROUND_Y - c.h * 0.7, 6, 3);
        ctx.fillRect(c.x - 5, GROUND_Y - c.h * 0.7, 3, c.h * 0.25);
        ctx.fillRect(c.x + CACTUS_W - 1, GROUND_Y - c.h * 0.5, 6, 3);
        ctx.fillRect(c.x + CACTUS_W + 2, GROUND_Y - c.h * 0.5, 3, c.h * 0.2);
      }
    };

    const loop = () => {
      const colors = getColors();
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.strokeStyle = colors.ground;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_W, GROUND_Y);
      ctx.stroke();

      ctx.fillStyle = colors.ground;
      for (let i = 0; i < CANVAS_W; i += 20) {
        const offset = (frameCount.current * speed.current) % 20;
        ctx.fillRect(i - offset, GROUND_Y + 4, 2, 1);
        ctx.fillRect(i - offset + 10, GROUND_Y + 8, 3, 1);
      }

      if (gameStateRef.current === "playing") {
        frameCount.current++;
        velocity.current += GRAVITY;
        dinoY.current += velocity.current;

        if (dinoY.current >= GROUND_Y - DINO_H) {
          dinoY.current = GROUND_Y - DINO_H;
          velocity.current = 0;
          isJumping.current = false;
        }

        speed.current += SPEED_INCREMENT;

        const lastCactus = cacti.current[cacti.current.length - 1];
        const minGap = 200 / (speed.current / INITIAL_SPEED);
        if (!lastCactus || lastCactus.x < CANVAS_W - Math.max(minGap, 150)) {
          if (Math.random() < 0.02) {
            cacti.current.push({
              x: CANVAS_W,
              h: CACTUS_MIN_H + Math.random() * (CACTUS_MAX_H - CACTUS_MIN_H),
            });
          }
        }

        cacti.current.forEach((c) => (c.x -= speed.current));
        cacti.current = cacti.current.filter((c) => c.x > -30);

        const dinoBox = {
          x: 50 + 2,
          y: dinoY.current + 2,
          w: DINO_W - 4,
          h: (isDucking.current ? DINO_H * 0.6 : DINO_H) - 4,
        };

        for (const c of cacti.current) {
          if (
            dinoBox.x < c.x + CACTUS_W - 2 &&
            dinoBox.x + dinoBox.w > c.x + 2 &&
            dinoBox.y + dinoBox.h > GROUND_Y - c.h + 2
          ) {
            setGameState("over");
            gameStateRef.current = "over";
            const final = scoreRef.current;
            if (final > highScore) {
              setHighScore(final);
              localStorage.setItem("dino-high-score", String(final));
            }
            break;
          }
        }

        if (frameCount.current % 5 === 0) {
          scoreRef.current++;
          setScore(scoreRef.current);
        }
      }

      cacti.current.forEach((c) => drawCactus(c, colors));
      drawDino(colors);

      ctx.fillStyle = colors.text;
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(String(scoreRef.current).padStart(5, "0"), CANVAS_W - 10, 20);

      if (highScore > 0) {
        ctx.fillText(`HI ${String(highScore).padStart(5, "0")}`, CANVAS_W - 70, 20);
      }

      if (gameStateRef.current === "idle") {
        ctx.fillStyle = colors.text;
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("press space or tap to start", CANVAS_W / 2, 60);
      }

      if (gameStateRef.current === "over") {
        ctx.fillStyle = colors.gameOver;
        ctx.font = "bold 16px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", CANVAS_W / 2, 50);
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillStyle = colors.text;
        ctx.fillText("press space or tap to restart", CANVAS_W / 2, 72);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [highScore]);

  return (
    <div
      className="border border-border rounded-xl overflow-hidden bg-surface/30 hover:border-accent/20 transition-colors cursor-pointer"
      onClick={jump}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface/50">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-accent">▸</span>
          <span className="font-mono text-[10px] text-muted">dino.exe</span>
        </div>
        <span className="font-mono text-[10px] text-muted/50">
          {gameState === "playing" ? "running" : gameState === "over" ? "stopped" : "ready"}
        </span>
      </div>
      <div className="flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="max-w-full h-auto"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    </div>
  );
}
