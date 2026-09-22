import { setUser } from "@/lib/store/animi/auth-slice";
import { animiApi } from "@/lib/store/api/animi";
import { PrivateUser } from "@/lib/types/entities/user";

interface SigninRequest {
    username: string;
    password: string;
}

interface SignupRequest {
    email: string;
    username: string;
    password: string;
}

export interface AvatarOption {
    id: number;
    path: string;
    isAvatarAllowed: boolean;
}

export interface AvatarOptionsResult {
    items: AvatarOption[];
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}

const animiAuthEndpoints = animiApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<PrivateUser, void>({
            query: () => "/auth/me",
            providesTags: ["Me"],
        }),
        signup: builder.mutation<PrivateUser, SignupRequest>({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch {}
            },
            invalidatesTags: ["Me"],
        }),
        signin: builder.mutation<PrivateUser, SigninRequest>({
            query: (body) => ({
                url: "/auth/signin",
                method: "POST",
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch {}
            },
            invalidatesTags: ["Me"],
        }),
        requestPasswordReset: builder.mutation<
            { message: string },
            { email: string }
        >({
            query: (body) => ({
                url: "/auth/password-reset/request",
                method: "POST",
                body,
            }),
        }),
        confirmPasswordReset: builder.mutation<
            { message: string },
            { email: string; code: string; password: string }
        >({
            query: (body) => ({
                url: "/auth/password-reset/confirm",
                method: "POST",
                body,
            }),
        }),
        getAvatarOptions: builder.query<
            AvatarOptionsResult,
            { page?: number; limit?: number; search?: string } | void
        >({
            query: (params) => ({
                url: "/auth/avatars",
                params: {
                    page: params?.page ?? 1,
                    limit: params?.limit ?? 24,
                    search: params?.search || undefined,
                },
            }),
            providesTags: ["Me"],
        }),
        updateProfile: builder.mutation<
            PrivateUser,
            { email?: string; avatar?: number | null }
        >({
            query: (body) => ({
                url: "/auth/profile",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Me"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch {}
            },
        }),
        changePassword: builder.mutation<
            { message: string },
            { currentPassword: string; newPassword: string }
        >({
            query: (body) => ({
                url: "/auth/password",
                method: "PATCH",
                body,
            }),
        }),
        logout: builder.query<void, void>({
            query: () => "/auth/logout",
            providesTags: ["Me"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(animiApi.util.resetApiState());
                } catch {}
            },
        }),
    }),
});

export const {
    useGetMeQuery,
    useSignupMutation,
    useSigninMutation,
    useRequestPasswordResetMutation,
    useConfirmPasswordResetMutation,
    useGetAvatarOptionsQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useLazyLogoutQuery,
} = animiAuthEndpoints;
