import Button from "@/components/ui/shared/buttons/button";
import { FieldErrorMessage, RequestErrorMessage } from "@/components/ui/shared/form-error";
import TextInput from "@/components/ui/shared/inputs/text-input";
import { getErrorMessage } from "@/lib/helpers/get-error-message";
import { useSigninMutation } from "@/lib/store/animi/auth-enpoints";
import { KeyRound, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    changeToRegister: () => void;
    changeToForgot: () => void;
}

interface LoginFormData {
    username: string;
    password: string;
}

export default function AuthForm({ changeToRegister, changeToForgot }: Props) {
    const [signin, signinState] = useSigninMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        mode: "onTouched",
    });

    const submit: SubmitHandler<LoginFormData> = async ({ username, password }) => {
        try {
            await signin({
                username: username.trim(),
                password,
            }).unwrap();
        } catch {
            // RTK Query already stores the request error in signinState.error.
        }
    };

    return (
        <form className="space-y-2.5" onSubmit={handleSubmit(submit)} noValidate>
            {signinState.error && (
                <RequestErrorMessage>
                    {getErrorMessage(signinState.error)}
                </RequestErrorMessage>
            )}

            <div>
                <TextInput
                    placeholder="Пошта або ім'я користувача"
                    icon={<User size={20} />}
                    autoComplete="username"
                    aria-invalid={Boolean(errors.username)}
                    aria-describedby={errors.username ? "login-username-error" : undefined}
                    {...register("username", {
                        required: "Введіть пошту або ім'я користувача",
                        validate: (value) =>
                            value.trim().length > 0 ||
                            "Введіть пошту або ім'я користувача",
                    })}
                />
                <FieldErrorMessage
                    id="login-username-error"
                    message={errors.username?.message}
                />
            </div>

            <div>
                <TextInput
                    type="password"
                    placeholder="Пароль"
                    icon={<KeyRound size={20} />}
                    autoComplete="current-password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "login-password-error" : undefined}
                    {...register("password", {
                        required: "Введіть пароль",
                    })}
                />
                <FieldErrorMessage
                    id="login-password-error"
                    message={errors.password?.message}
                />
            </div>

            <div className="flex justify-end px-0.5">
                <button
                    type="button"
                    className="cursor-pointer text-[12px] text-white/38 transition hover:text-(--primary)"
                    onClick={changeToForgot}
                >
                    Забули пароль?
                </button>
            </div>

            <Button
                type="submit"
                className="mt-1 w-full"
                loading={signinState.isLoading}
            >
                Увійти
            </Button>

            <div className="pt-1 text-center text-[13px] leading-5 text-white/40">
                Ще не маєте акаунта?{" "}
                <button
                    type="button"
                    className="cursor-pointer text-(--primary) underline-offset-2 hover:underline"
                    onClick={changeToRegister}
                >
                    Зареєструватись
                </button>
            </div>
        </form>
    );
}
