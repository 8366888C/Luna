"use client";

import type { portfolioConfig } from "@/lib/types";

interface FeaturedPortfolioProps {
	items: portfolioConfig[];
}

export function FeaturedPortfolioCard({ items }: FeaturedPortfolioProps) {
	const recentProjects = items.slice(0, 3);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{recentProjects.map((item) => {
				const firstImage = item.images && item.images.length > 0 ? item.images[0] : null;

				return (
					<a key={item.id} href={`/portfolio/${item.id}`} className="group block bg-muted border border-border overflow-hidden hover:border-foreground/20 relative hover:bg-card active:scale-100 hover:scale-102 animation">
						{firstImage && (
							<div className="aspect-4/3 overflow-hidden">
								<img src={firstImage} alt={item.title} className="w-full h-full object-cover grayscale-100 group-hover:grayscale-0 animation" />
							</div>
						)}

						<div className="p-4 bg-muted group-hover:bg-card animation z-10">
							<span className="text-xs uppercase tracking-wider text-muted-foreground">{item.category}</span>

							<h3 className="mt-2 text-xl font-medium leading-snug text-foreground/80 group-hover:text-foreground animation line-clamp-1">{item.title}</h3>

							<p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.tagline || item.description}</p>

							{item.keywords && item.keywords.length > 0 && (
								<div className="flex flex-wrap gap-1.5 mt-3">
									{item.keywords.slice(0, 3).map((keyword) => (
										<span key={keyword} className="text-xs px-2 py-0.5 bg-background group-hover:bg-muted text-muted-foreground/80 rounded-sm border border-border animation">
											{keyword}
										</span>
									))}
								</div>
							)}
						</div>
					</a>
				);
			})}
		</div>
	);
}
