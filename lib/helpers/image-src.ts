export function imageSrc(path?: string | null) {
    return path ? `/uploads/${encodeURIComponent(path)}` : null;
}