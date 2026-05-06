"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { RiPlayLargeFill, RiPauseLargeFill, RiArrowUpFill, RiArrowLeftFill, RiArrowRightFill, RiArrowDownFill } from "@remixicon/react";

const GRID_SIZE = 21;
const CELL_SIZE = 16;
const BOARD_SIZE = GRID_SIZE * CELL_SIZE;
const waveSpeed = 12;

const Snake: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const gameLoopRef = useRef<number | null>(null);
	const waveRef = useRef<number | null>(null);

	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [gameOverWave, setGameOverWave] = useState(false);
	const [waveAnimating, setWaveAnimating] = useState(false);
	const [snakeScore, setSnakeScore] = useState(false);
	const [newBestScore, setNewBestScore] = useState(false);

	const [activeDirection, setActiveDirection] = useState<string | null>(null);

	const snake = useRef<{ x: number; y: number }[]>([]);
	const direction = useRef({ x: 0, y: -1 });
	const nextDirection = useRef({ x: 0, y: -1 });
	const food = useRef({ x: 0, y: 0 });
	const scoreRef = useRef(0);
	const highScoreRef = useRef(0);

	useEffect(() => {
		const savedHighScore = localStorage.getItem("snakeHighScore");
		if (savedHighScore) {
			const parsed = parseInt(savedHighScore, 10);
			setHighScore(parsed);
			highScoreRef.current = parsed;
		}
	}, []);

	const saveHighScore = (score: number) => {
		localStorage.setItem("snakeHighScore", score.toString());
	};

	const getColors = () => {
		const isDark = document.documentElement.classList.contains("dark");
		if (isDark) {
			return {
				bg: "#242222",
				fg: "#fafafa",
				primary: "#ebd9d8",
				muted: "#464444",
				border: "#ffffff1a",
			};
		}
		return {
			bg: "#ffffff",
			fg: "#242222",
			primary: "#353333",
			muted: "#f3f2f0",
			border: "#e5e5e5",
		};
	};

	const getInvertedColors = () => {
		const isDark = document.documentElement.classList.contains("dark");
		if (isDark) {
			return {
				bg: "#ebd9d8",
				fg: "#242222",
				primary: "#fafafa",
				muted: "#888888",
				border: "#666666",
			};
		}
		return {
			bg: "#353333",
			fg: "#fafafa",
			primary: "#e0e0e0",
			muted: "#666666",
			border: "#555555",
		};
	};

	const hexToRGB = (hex: string) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				}
			: null;
	};

	const interpolateColor = (start: string, end: string, ratio: number): string => {
		const startRGB = hexToRGB(start);
		const endRGB = hexToRGB(end);
		if (!startRGB || !endRGB) return start;

		const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * ratio);
		const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * ratio);
		const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * ratio);
		return `rgb(${r}, ${g}, ${b})`;
	};

	const draw = (initial = false) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const colors = getColors();
		if (!colors) return;

		ctx.fillStyle = colors.bg;
		ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		ctx.strokeStyle = colors.border;
		ctx.lineWidth = 1;
		for (let i = 0; i <= GRID_SIZE; i++) {
			ctx.beginPath();
			ctx.moveTo(i * CELL_SIZE, 0);
			ctx.lineTo(i * CELL_SIZE, BOARD_SIZE);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(0, i * CELL_SIZE);
			ctx.lineTo(BOARD_SIZE, i * CELL_SIZE);
			ctx.stroke();
		}

		if (initial) return;

		const total = snake.current.length;
		const isTailEnd = (index: number) => index === total - 1;

		snake.current.forEach((seg, i) => {
			const positionRatio = i / (total - 1 || 1);
			ctx.fillStyle = interpolateColor(colors.primary, colors.muted, positionRatio);

			if (i === 0) {
				const x = seg.x * CELL_SIZE + 1;
				const y = seg.y * CELL_SIZE + 1;
				const size = CELL_SIZE - 2;
				const radius = 6;
				ctx.beginPath();
				ctx.roundRect(x, y, size, size, radius);
				ctx.fill();
			} else {
				const x = seg.x * CELL_SIZE + 1;
				const y = seg.y * CELL_SIZE + 1;
				const size = CELL_SIZE - 2;
				ctx.fillRect(x, y, size, size);

				if (isTailEnd(i)) {
					ctx.strokeStyle = colors.fg;
					ctx.lineWidth = 2;
					ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);
				}
			}
		});

		ctx.fillStyle = colors.fg;
		ctx.beginPath();
		ctx.arc(food.current.x * CELL_SIZE + CELL_SIZE / 2, food.current.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
		ctx.fill();

		if (gameOverWave) {
			const invColors = getInvertedColors();
			ctx.fillStyle = invColors.fg;
			ctx.font = "bold 28px monospace";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("SNAKE", BOARD_SIZE / 2, BOARD_SIZE / 2);
		}
	};

	const resetCanvasToNormal = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const colors = getColors();
		if (!colors) return;

		ctx.fillStyle = colors.bg;
		ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		ctx.strokeStyle = colors.border;
		ctx.lineWidth = 1;
		for (let i = 0; i <= GRID_SIZE; i++) {
			ctx.beginPath();
			ctx.moveTo(i * CELL_SIZE, 0);
			ctx.lineTo(i * CELL_SIZE, BOARD_SIZE);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(0, i * CELL_SIZE);
			ctx.lineTo(BOARD_SIZE, i * CELL_SIZE);
			ctx.stroke();
		}
	};

	const triggerScoreEffect = () => {
		setSnakeScore(true);
		setTimeout(() => setSnakeScore(false), 300);
	};

	const triggerNewBestEffect = () => {
		setNewBestScore(true);
		setTimeout(() => setNewBestScore(false), 300);
	};

	const triggerBestGlow = () => {
		setTimeout(() => {
			const newBest = localStorage.getItem("snakeHighScore");
			const currentBest = newBest ? parseInt(newBest, 10) : 0;
			if (currentBest > 0) {
				saveHighScore(currentBest);
			}
		}, 100);
	};

	const startWaveEffect = useCallback(() => {
		setWaveAnimating(true);

		const initialColors = getInvertedColors();
		const finalColors = getColors();

		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.fillStyle = initialColors.bg;
		ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		ctx.strokeStyle = initialColors.border;
		ctx.lineWidth = 1;
		for (let i = 0; i <= GRID_SIZE; i++) {
			ctx.beginPath();
			ctx.moveTo(i * CELL_SIZE, 0);
			ctx.lineTo(i * CELL_SIZE, BOARD_SIZE);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(0, i * CELL_SIZE);
			ctx.lineTo(BOARD_SIZE, i * CELL_SIZE);
			ctx.stroke();
		}

		const queue: { x: number; y: number }[] = [];
		const centerX = 10;
		const centerY = 10;

		for (let x = 0; x <= GRID_SIZE - 1; x++) {
			for (let y = 0; y <= GRID_SIZE - 1; y++) {
				queue.push({ x, y });
			}
		}

		queue.sort((a, b) => {
			const distA = Math.max(Math.abs(a.x - centerX), Math.abs(a.y - centerY));
			const distB = Math.max(Math.abs(b.x - centerX), Math.abs(b.y - centerY));
			return distB - distA;
		});

		let index = 0;

		waveRef.current = window.setInterval(() => {
			if (index >= queue.length) {
				if (waveRef.current) clearInterval(waveRef.current);
				setWaveAnimating(false);
				draw();
				return;
			}

			const batchSize = 25;
			for (let i = 0; i < batchSize && index < queue.length; i++) {
				const cell = queue[index];
				ctx.fillStyle = finalColors.bg;
				ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

				ctx.strokeStyle = finalColors.border;
				ctx.strokeRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
				index++;
			}
		}, waveSpeed);
	}, []);

	const gameOverFlashEffect = useCallback(() => {
		setGameOverWave(true);
		setWaveAnimating(true);

		const flash = (isInverted: boolean, showSnake: boolean = true) => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			const useColors = isInverted ? getInvertedColors() : getColors();
			if (!useColors) return;

			ctx.fillStyle = useColors.bg;
			ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

			ctx.strokeStyle = useColors.border;
			ctx.lineWidth = 1;
			for (let i = 0; i <= GRID_SIZE; i++) {
				ctx.beginPath();
				ctx.moveTo(i * CELL_SIZE, 0);
				ctx.lineTo(i * CELL_SIZE, BOARD_SIZE);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(0, i * CELL_SIZE);
				ctx.lineTo(BOARD_SIZE, i * CELL_SIZE);
				ctx.stroke();
			}

			if (showSnake && snake.current.length > 0) {
				const snakeColors = isInverted ? getInvertedColors() : getColors();
				const total = snake.current.length;
				const isTailEnd = (index: number) => index === total - 1;

				snake.current.forEach((seg, i) => {
					const positionRatio = i / (total - 1 || 1);
					ctx.fillStyle = interpolateColor(snakeColors.primary, snakeColors.muted, positionRatio);

					if (i === 0) {
						const x = seg.x * CELL_SIZE + 1;
						const y = seg.y * CELL_SIZE + 1;
						const size = CELL_SIZE - 2;
						const radius = 6;
						ctx.beginPath();
						ctx.roundRect(x, y, size, size, radius);
						ctx.fill();
					} else {
						const x = seg.x * CELL_SIZE + 1;
						const y = seg.y * CELL_SIZE + 1;
						const size = CELL_SIZE - 2;
						ctx.fillRect(x, y, size, size);

						if (isTailEnd(i)) {
							ctx.strokeStyle = snakeColors.fg;
							ctx.lineWidth = 2;
							ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);
						}
					}
				});

				ctx.fillStyle = snakeColors.fg;
				ctx.beginPath();
				ctx.arc(food.current.x * CELL_SIZE + CELL_SIZE / 2, food.current.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
				ctx.fill();
			}
		};

		const flashSequence = [true, false, true, false, true];
		let flashIndex = 0;

		waveRef.current = window.setInterval(() => {
			if (flashIndex >= flashSequence.length) {
				if (waveRef.current) clearInterval(waveRef.current);
				flash(true, true);
				setWaveAnimating(false);
				return;
			}
			flash(flashSequence[flashIndex], flashIndex < 4);
			flashIndex++;
		}, 100);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const invColors = getInvertedColors();

		ctx.fillStyle = invColors.bg;
		ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		ctx.strokeStyle = invColors.border;
		ctx.lineWidth = 1;
		for (let i = 0; i <= GRID_SIZE; i++) {
			ctx.beginPath();
			ctx.moveTo(i * CELL_SIZE, 0);
			ctx.lineTo(i * CELL_SIZE, BOARD_SIZE);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(0, i * CELL_SIZE);
			ctx.lineTo(BOARD_SIZE, i * CELL_SIZE);
			ctx.stroke();
		}
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (waveAnimating) {
				e.preventDefault();
				return;
			}

			const target = e.target as HTMLElement;
			if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

			const keyMap: Record<string, string> = {
				ArrowUp: "up",
				w: "up",
				W: "up",
				ArrowDown: "down",
				s: "down",
				S: "down",
				ArrowLeft: "left",
				a: "left",
				A: "left",
				ArrowRight: "right",
				d: "right",
				D: "right",
			};

			if (keyMap[e.key]) {
				setActiveDirection(keyMap[e.key]);
				e.preventDefault();
			}

			if (e.key === " " || e.key === "p" || e.key === "P") {
				e.preventDefault();
				if (gameStarted && !gameOver) {
					setIsPaused((p) => !p);
				}
				return;
			}

			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (!gameStarted || gameOver) {
					restart();
				}
				return;
			}

			if (!gameStarted || gameOver || isPaused) {
				return;
			}

			const dirMap: Record<string, { x: number; y: number }> = {
				ArrowUp: { x: 0, y: -1 },
				w: { x: 0, y: -1 },
				W: { x: 0, y: -1 },
				ArrowDown: { x: 0, y: 1 },
				s: { x: 0, y: 1 },
				S: { x: 0, y: 1 },
				ArrowLeft: { x: -1, y: 0 },
				a: { x: -1, y: 0 },
				A: { x: -1, y: 0 },
				ArrowRight: { x: 1, y: 0 },
				d: { x: 1, y: 0 },
				D: { x: 1, y: 0 },
			};

			const newDir = dirMap[e.key];
			if (newDir && snake.current.length > 0) {
				const cur = direction.current;
				if (!((cur.x === -newDir.x && cur.x !== 0) || (cur.y === -newDir.y && cur.y !== 0))) {
					nextDirection.current = newDir;
				}
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			const keyMap: Record<string, string> = {
				ArrowUp: "up",
				w: "up",
				W: "up",
				ArrowDown: "down",
				s: "down",
				S: "down",
				ArrowLeft: "left",
				a: "left",
				A: "left",
				ArrowRight: "right",
				d: "right",
				D: "right",
			};

			if (keyMap[e.key]) {
				setActiveDirection(null);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [waveAnimating]);

	const changeDirection = (newDir: { x: number; y: number }, dirName: string) => {
		if (!gameStarted || gameOver || isPaused || waveAnimating) return;

		const cur = direction.current;
		if (!((cur.x === -newDir.x && cur.x !== 0) || (cur.y === -newDir.y && cur.y !== 0))) {
			nextDirection.current = newDir;
			setActiveDirection(dirName);
		}
	};

	const restart = () => {
		snake.current = [
			{ x: 10, y: 10 },
			{ x: 10, y: 11 },
			{ x: 10, y: 12 },
		];
		direction.current = { x: 0, y: -1 };
		nextDirection.current = { x: 0, y: -1 };
		scoreRef.current = 0;
		setScore(0);
		setGameOver(false);
		setGameStarted(true);
		setIsPaused(false);
		setGameOverWave(false);

		resetCanvasToNormal();
		triggerBestGlow();

		let newFood: { x: number; y: number };
		do {
			newFood = {
				x: Math.floor(Math.random() * GRID_SIZE),
				y: Math.floor(Math.random() * GRID_SIZE),
			};
		} while (snake.current.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
		food.current = newFood;

		startWaveEffect();
	};

	useEffect(() => {
		if (!gameStarted || gameOver || waveAnimating) return;

		const tick = () => {
			if (snake.current.length === 0) return;

			direction.current = { ...nextDirection.current };
			const head = snake.current[0];
			const newHead = {
				x: head.x + direction.current.x,
				y: head.y + direction.current.y,
			};

			if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE || snake.current.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
				setGameOver(true);
				setGameStarted(false);
				gameOverFlashEffect();
				return;
			}

			snake.current.unshift(newHead);

			if (newHead.x === food.current.x && newHead.y === food.current.y) {
				scoreRef.current += 10;
				setScore(scoreRef.current);
				triggerScoreEffect();

				if (scoreRef.current > highScoreRef.current) {
					highScoreRef.current = scoreRef.current;
					setHighScore(scoreRef.current);
					saveHighScore(scoreRef.current);
					triggerNewBestEffect();
				}

				let newFood: { x: number; y: number };
				do {
					newFood = {
						x: Math.floor(Math.random() * GRID_SIZE),
						y: Math.floor(Math.random() * GRID_SIZE),
					};
				} while (snake.current.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
				food.current = newFood;
			} else {
				snake.current.pop();
			}

			draw();
		};

		if (!isPaused && gameStarted && !gameOver) {
			gameLoopRef.current = window.setInterval(tick, 100);
		}

		return () => {
			if (gameLoopRef.current) {
				clearInterval(gameLoopRef.current);
			}
		};
	}, [gameStarted, gameOver, isPaused, waveAnimating]);

	useEffect(() => {
		if (gameStarted && !waveAnimating) {
			draw();
		}
	}, [gameStarted, waveAnimating]);

	const getPlayButtonContent = () => {
		if (!gameStarted && !gameOver) {
			return { icon: "▶", state: "ready" };
		}
		if (isPaused) {
			return { icon: "⏸", state: "paused" };
		}
		return { icon: "⏸", state: "playing" };
	};

	const playButtonState = getPlayButtonContent();

	return (
		<div className="mb-2 flex items-center justify-center gap-12 border border-border">
			<div className="flex flex-col items-center justify-center gap-3">
				<button
					disabled={gameStarted && !gameOver}
					onClick={() => (!gameStarted || gameOver ? restart() : null)}
					className={`
            p-6 border animation
            ${gameStarted && !gameOver ? "scale-95 bg-muted cursor-not-allowed border-border" : "scale-105 bg-background border-foreground/30 cursor-pointer"}
          `}
				>
					<RiPlayLargeFill
						className={`
             animation
            ${gameStarted && !gameOver ? "fill-muted-foreground" : "fill-foreground"}
          `}
					/>
				</button>
				<button
					disabled={!gameStarted || gameOver}
					onClick={() => gameStarted && !gameOver && setIsPaused(!isPaused)}
					className={`
            p-6 border animation
            ${isPaused ? "bg-foreground/80 text-background border-foreground" : !gameStarted || gameOver ? "scale-95 bg-muted cursor-not-allowed border-border" : "scale-105 bg-background border-foreground/30 cursor-pointer"}
          `}
				>
					<RiPauseLargeFill
						className={`
            animation
            ${isPaused ? "" : !gameStarted || gameOver ? "fill-muted-foreground" : "fill-foreground"}
          `}
					/>
				</button>
			</div>

			<div className={`flex flex-col animation border border-border items-center gap-0 w-fit`}>
				<div className="flex items-center text-sm my-3 gap-12">
					<div className={`text-foreground border animation px-3 py-1 ${snakeScore ? "border-foreground/80" : "border-border"}`}>
						score <span className="font-normal">{score}</span>
					</div>
					<div
						className={`
              text-muted-foreground border animation px-3 py-1
              ${newBestScore ? "border-foreground/80" : "border-border"}
            `}
					>
						best <span className="">{highScore}</span>
					</div>
				</div>

				<canvas
					ref={canvasRef}
					width={BOARD_SIZE}
					height={BOARD_SIZE}
					className={`
            border animation
            ${snakeScore ? "border-foreground/80" : "border-border"}
          `}
				/>

				<div className="my-6 flex flex-col items-center justify-center">
					<p className="text-base text-foreground">Press Enter to Start</p>
					<div className="flex flex-col items-center justify-center mt-2 space-y-0.5 text-sm text-muted-foreground">
						<p>WASD or Arrow Keys to move</p>
						<p>Space or P to pause</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-3">
				<button
					onClick={() => changeDirection({ x: 0, y: -1 }, "up")}
					className={`
            p-3 border animation
            ${activeDirection === "up" ? "scale-95 bg-foreground/80 text-background border-foreground" : "scale-105 bg-background text-foreground border-foreground/30"}
          `}
				>
					<RiArrowUpFill className="size-8" />
				</button>
				<div className="flex gap-3">
					<button
						onClick={() => changeDirection({ x: -1, y: 0 }, "left")}
						className={`
              p-3 border animation
              ${activeDirection === "left" ? "scale-95 bg-foreground/80 text-background border-foreground" : "scale-105 bg-background text-foreground border-foreground/30"}
            `}
					>
						<RiArrowLeftFill className="size-8" />
					</button>
					<button
						onClick={() => changeDirection({ x: 1, y: 0 }, "right")}
						className={`
              p-3 border animation
              ${activeDirection === "right" ? "scale-95 bg-foreground/80 text-background border-foreground" : "scale-105 bg-background text-foreground border-foreground/30"}
            `}
					>
						<RiArrowRightFill className="size-8" />
					</button>
				</div>
				<button
					onClick={() => changeDirection({ x: 0, y: 1 }, "down")}
					className={`
            p-3 border animation
            ${activeDirection === "down" ? "scale-95 bg-foreground/80 text-background border-foreground" : "scale-105 bg-background text-foreground border-foreground/30"}
          `}
				>
					<RiArrowDownFill className="size-8" />
				</button>
			</div>
		</div>
	);
};

export default Snake;
