"use client";

import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Image from "next/image";

// ✅ Replace with actual image URLs
const images = [
	{
		src: "/20250125_144020.jpg",
		alt: "Image 1",
	},
	{
		src: "/IMG-20241222-WA0002.jpg",
		alt: "Image 2",
	},
	{
		src: "/IMG-20250121-WA0001.jpg",
		alt: "Image 3",
	},
];

export default function Example() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{images.map((img, index) => (
						<div key={index} className="flex justify-center items-center p-6 bg-zinc-800 rounded-lg">
							<Card>
								<Image
									src={img.src}
									alt={img.alt}
									width={300} 
									height={300}
									className="rounded-lg object-cover"
								/>
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
