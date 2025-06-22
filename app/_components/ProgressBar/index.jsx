export function ProgressBar({
	currentIndex,
	progress,
	topNewsLength,
}) {
	return (
		<div className="flex justify-between mb-4 gap-2 items-center w-full">
			{Array.from({ length: topNewsLength }).map((_, i) => (
				<div key={i} className="relative w-full">
					<div className="absolute inset-0 py-2 mt-0 flex items-center justify-center">
						<div className="h-[2px] w-full rounded-full bg-white/30 relative">
							{i === currentIndex && (
								<div
									className="h-full bg-white rounded-full"
									style={{
										width: `${progress}%`,
										transition: "width 100ms linear",
									}}
								></div>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
