export interface Image {
    id: number;
    alt: string | null;
    path: string;
    isAvatarAllowed: boolean;
}

export interface PrivateImage extends Image {
    sourceUrl: string | null;
    createdAt: string;
    updatedAt: string;
}
