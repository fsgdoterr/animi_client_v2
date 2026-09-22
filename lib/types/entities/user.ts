import { UserRole, Permissions } from "@/lib/constants/permissions";
import { Image, PrivateImage } from "@/lib/types/entities/image-type";

export interface User {
    id: number;
    username: string;
    permissions: Permissions[];
    role: UserRole;
    displayName: string | null;
    avatar: Image | PrivateImage | null;
}

export interface PrivateUser extends User {
    email: string;
    createdAt: string;
    updatedAt?: string;
}