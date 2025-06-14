"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/id";

function formatDate(dateString) {
	return moment(dateString).format("D MMMM YYYY");
}

export function Card({
	image,
	title, content,
	slug, created_at
}) {
	return (
		<Link href={`/${slug}`} passHref>
			<div className="w-full mt-8 lg:mt-5 cursor-pointer relative group">
				<div className="relative h-60  overflow-hidden rounded-3xl transition-transform duration-500 ease-outquint-ease group-hover:brightness-95 group-hover:scale-[0.98]">
					<Image
						layout="fill"
						src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`}
						alt="Card Image"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-30" />
				</div>
				<div className="mt-4">
					<p className="font-light text-sm bg-tertiary rounded-2xl px-6 py-1 w-max">
						{created_at}
					</p>
					<h1 className="text-2xl mt-2">{title}</h1>
					<h2 className="text-md leading-none line-clamp-3 font-thin mt-2">{content}</h2>
				</div>
			</div>

		</Link>
	);
}
