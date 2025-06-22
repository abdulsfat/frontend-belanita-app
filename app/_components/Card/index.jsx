"use client";

import Link from "next/link";
import { formatDate } from "@/app/_utils/dateFormatter";
import SafeImage from "@/app/_components/Admin/common/SafeImage";

export function Card({
						 image,
						 title,
						 content,
						 slug,
						 created_at,
						 price,
						 stock,
					 }) {
	const isMerch = price !== undefined && stock !== undefined;

	return (
		<Link href={`/${slug}`} passHref>
			<div className="w-full mt-8 lg:mt-5 cursor-pointer relative group">
				{/* Gambar */}
				<div className="relative h-60 overflow-hidden rounded-3xl transition-transform duration-500 ease-outquint-ease group-hover:brightness-95 group-hover:scale-[0.98]">
					<SafeImage
						fill
						src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`}
						alt="Card Image"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-30" />
				</div>

				{/* Konten */}
				<div className="mt-4">
					{/* Tanggal atau badge stok */}
					{isMerch ? (
						<p className="font-light text-sm bg-tertiary rounded-2xl px-6 py-1 w-max">
							Stok: {stock}
						</p>
					) : (
						<p className="font-light text-sm bg-tertiary rounded-2xl px-6 py-1 w-max">
							{formatDate(created_at)}
						</p>
					)}

					{/* Judul */}
					<h1 className="text-2xl mt-2 line-clamp-2">{title}</h1>

					{/* Content untuk artikel / Harga untuk merch */}
					{isMerch ? (
						<p className="text-md leading-5 line-clamp-3 font-normal mt-2">
							Rp {Number(price).toLocaleString("id-ID")}
						</p>
					) : (
						<h2 className="text-md leading-5 line-clamp-3 font-thin mt-2">{content}</h2>
					)}
				</div>
			</div>
		</Link>
	);
}
