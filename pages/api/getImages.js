import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const galleryPath = path.join(process.cwd(), "public/gallery");
    
    // Read all image files in the folder
    try {
        const files = fs.readdirSync(galleryPath);

        // Filter to include only image files (jpg, png, webp, etc.)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

        // Return full path for frontend usage
        const imagePaths = imageFiles.map(file => `/gallery/${file}`);

        res.status(200).json({ images: imagePaths });
    } catch (error) {
        res.status(500).json({ error: "Error reading images from gallery folder" });
    }
}
