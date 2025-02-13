"use client";

import { useState, useEffect } from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Image from "next/image";

// Function to shuffle an array with explicit typing
const shuffleArray = (array: string[]): string[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export default function Gallery() {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch("/api/getImages");
                const data: { images: string[] } = await response.json();
                
                // Shuffle images before setting state
                setImages(shuffleArray(data.images));
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        }

        fetchImages();
    }, []);

    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
            <Navigation />

            <div className="container mx-auto px-4 py-8 pt-20">
                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((src, index) => (
                        <div key={index} className="relative p-4 bg-zinc-800 rounded-lg flex justify-center items-center">
                            <Card>
                                <Image
                                    src={src}
                                    alt={`Gallery Image ${index + 1}`}
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
