import { Permissions, UserRole } from "@/lib/constants/permissions";
import { mockImages } from "@/lib/mock/images";
import { PrivateUser } from "@/lib/types/entities/user";

export const mockUsers: PrivateUser[] = [
    {
        id: 1,
        displayName: "Admin name",
        username: "admin",
        email: "admin@admin.com",
        createdAt: "2026-09-13T18:57:51.000Z",
        updatedAt: "2026-09-13T18:57:51.000Z",
        avatar: null,
        role: UserRole.SUPER_ADMIN,
        permissions: [Permissions.DEF],
    },
    {
        id: 2,
        displayName: "Admin name",
        username: "admin2",
        email: "admin2@admin.com",
        createdAt: "2026-09-13T18:57:51.000Z",
        updatedAt: "2026-09-13T18:57:51.000Z",
        avatar: mockImages[0],
        role: UserRole.SUPER_ADMIN,
        permissions: [Permissions.DEF],
    },
];
