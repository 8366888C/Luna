"use client";

import { RiWindowsFill, RiChromeFill, RiFigmaFill, RiCodeSSlashLine } from "@remixicon/react";

const specs = {
	os: "Windows 11 Pro",
	kernel: "10.0.26100",
	uptime: "2 days, 4 hours",
	packages: "142 (winget)",
	shell: "PowerShell 7.4",
	resolution: "1920x1080 @ 144Hz",
	de: "Windows Desktop",
	terminal: "Windows Terminal",
	cpu: "AMD Ryzen 7 5800X (16) @ 4.8GHz",
	gpu: "NVIDIA GeForce RTX 3080",
	memory: "32GB DDR4 @ 3600MHz",
	disk: "1TB NVMe SSD + 2TB HDD",
};

const gearItems = [
	{
		name: "Editor",
		value: "VS Code",
		icon: RiCodeSSlashLine,
		color: "#007ACC",
	},
	{ name: "Browser", value: "Chrome", icon: RiChromeFill, color: "#4285F4" },
	{ name: "Design", value: "Figma", icon: RiFigmaFill, color: "#F24E1E" },
];

export function Fastfetch() {
	return (
		<div className="font-mono text-sm">
			<div className="flex flex-col md:flex-row gap-6 items-start">
				{/* ASCII Art Style Logo */}
				<div className="hidden md:block select-none">
					<pre className="text-xs leading-tight text-foreground/80">
						{`
       ██████╗ ███████╗
      ██╔═══██╗██╔════╝
      ██║   ██║███████╗
      ██║   ██║╚════██║
      ╚██████╔╝███████║
       ╚═════╝ ╚══════╝
            `}
					</pre>
				</div>

				{/* Specs */}
				<div className="flex-1 space-y-1">
					<div className="flex gap-3">
						<span className="text-primary font-semibold">OS</span>
						<span className="text-foreground/80">
							{specs.os} {specs.kernel}
						</span>
					</div>
					<div className="flex gap-3">
						<span className="text-primary font-semibold">Uptime</span>
						<span className="text-foreground/80">{specs.uptime}</span>
					</div>
					<div className="flex gap-3">
						<span className="text-primary font-semibold">Shell</span>
						<span className="text-foreground/80">{specs.shell}</span>
					</div>
					<div className="flex gap-3">
						<span className="text-primary font-semibold">Resolution</span>
						<span className="text-foreground/80">{specs.resolution}</span>
					</div>
					<div className="flex gap-3">
						<span className="text-primary font-semibold">CPU</span>
						<span className="text-foreground/80">{specs.cpu}</span>
					</div>
					<div className="flex gap-3">
						<span className="text-primary font-semibold">GPU</span>
						<span className="text-foreground/80">{specs.gpu}</span>
					</div>
					<div className="flex gap-3">
						<span className="text-primary font-semibold">Memory</span>
						<span className="text-foreground/80">{specs.memory}</span>
					</div>
				</div>

				{/* Daily Driver Gear */}
				<div className="border-l border-border pl-6 md:pl-6 space-y-3">
					<div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Daily Driver</div>
					{gearItems.map((gear) => (
						<div key={gear.name} className="flex items-center gap-3">
							<gear.icon className="size-5" style={{ color: gear.color }} />
							<div>
								<div className="text-xs text-muted-foreground">{gear.name}</div>
								<div className="text-sm text-foreground/90">{gear.value}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
