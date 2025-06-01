import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="flex justify-between items-center  space-x-2 mx-96">
			<div
				onClick={() => onPageChange(currentPage - 1)}
				className={`flex gap-2 items-center cursor-pointer ${
					currentPage === 1 ? "pointer-events-none opacity-50" : ""
				}`}
			>
				<div className="flex justify-center items-center rounded-full h-8 w-8 md:h-10 md:w-10 border border-secondary/40">
					<ArrowLeft className="h-5 w-5 text-secondary" />
				</div>
				<p className="text-sm text-secondary">Sebelumnya</p>
			</div>

			<div className="flex gap-2">
				{pages.map((page) => (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						className={`flex justify-center items-center rounded-full h-8 w-8 md:h-10 md:w-10 border border-secondary ${
							page === currentPage
								? "bg-secondary text-white"
								: "bg-transparent text-secondary"
						}`}
					>
						{page}
					</button>
				))}
			</div>

			<div
				onClick={() => onPageChange(currentPage + 1)}
				className={`flex gap-2 items-center cursor-pointer ${
					currentPage === totalPages
						? "pointer-events-none opacity-50"
						: ""
				}`}
			>
				<p className="text-sm text-secondary">Selanjutnya</p>
				<div className="flex justify-center items-center rounded-full h-8 w-8 md:h-10 md:w-10 border border-secondary/40">
					<ArrowRight className="h-5 w-5 text-secondary" />
				</div>
			</div>
		</div>
	);
}
