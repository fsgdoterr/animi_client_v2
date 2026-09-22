import Button from "@/components/ui/shared/buttons/button";
import { FieldErrorMessage, RequestErrorMessage } from "@/components/ui/shared/form-error";
import TextInput from "@/components/ui/shared/inputs/text-input";
import { getErrorMessage } from "@/lib/helpers/get-error-message";
import { useSignupMutation } from "@/lib/store/animi/auth-enpoints";
import { KeyRound, Mail, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    changeToAuth: () => void;
}

interface RegisterFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterForm({ changeToAuth }: Props) {
    const [signup, signupState] = useSignupMutation();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<RegisterFormData>({
        mode: "onTouched",
    });

    const submit: SubmitHandler<RegisterFormData> = async ({
        email,
        username,
        password,
    }) => {
        try {
            await signup({
                email: email.trim(),
                username: username.trim(),
                password,
            }).unwrap();
        } catch {
            // RTK Query already stores the request error in signupState.error.
        }
    };

    return (
        <form className="space-y-2.5" onSubmit={handleSubmit(submit)} noValidate>
            {signupState.error && (
                <RequestErrorMessage>
                    {getErrorMessage(signupState.error)}
                </RequestErrorMessage>
            )}

            <div>
                <TextInput
                    placeholder="Пошта"
                    icon={<Mail size={20} />}
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "register-email-error" : undefined}
                    {...register("email", {
                        required: "Поле пошти є обов'язковим",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Невалідна пошта",
                        },
                    })}
                />
                <FieldErrorMessage
                    id="register-email-error"
                    message={errors.email?.message}
                />
            </div>

            <div>
                <TextInput
                    placeholder="Ім'я користувача"
                    icon={<User size={20} />}
                    autoComplete="username"
                    aria-invalid={Boolean(errors.username)}
                    aria-describedby={
                        errors.username ? "register-username-error" : undefined
                    }
                    {...register("username", {
                        required: "Поле імені користувача є обов'язковим",
                        validate: (value) =>
                            value.trim().length > 0 ||
                            "Поле імені користувача є обов'язковим",
                        minLength: {
                            value: 4,
                            message:
                                "Ім'я користувача має містити щонайменше 4 символи",
                        },
                    })}
                />
                <FieldErrorMessage
                    id="register-username-error"
                    message={errors.username?.message}
                />
            </div>

            <div>
                <TextInput
                    placeholder="Пароль"
                    type="password"
                    icon={<KeyRound size={20} />}
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                        errors.password ? "register-password-error" : undefined
                    }
                    {...register("password", {
                        required: "Поле паролю є обов'язковим",
                        minLength: {
                            value: 6,
                            message: "Пароль має містити щонайменше 6 символів",
                        },
                        maxLength: {
                            value: 40,
                            message: "Пароль має містити не більше 40 символів",
                        },
                    })}
                />
                <FieldErrorMessage
                    id="register-password-error"
                    message={errors.password?.message}
                />
            </div>

            <div>
                <TextInput
                    placeholder="Підтвердіть пароль"
                    type="password"
                    icon={<KeyRound size={20} />}
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={
                        errors.confirmPassword
                            ? "register-confirm-password-error"
                            : undefined
                    }
                    {...register("confirmPassword", {
                        required: "Повторіть пароль",
                        validate: (value) =>
                            value === getValues("password") ||
                            "Паролі не співпадають",
                        deps: ["password"],
                    })}
                />
                <FieldErrorMessage
                    id="register-confirm-password-error"
                    message={errors.confirmPassword?.message}
                />
            </div>

            <Button
                type="submit"
                className="mt-1 w-full"
                loading={signupState.isLoading}
            >
                Зареєструватись
            </Button>

            <div className="pt-1 text-center text-[13px] leading-5 text-white/40">
                Вже є акаунт?{" "}
                <button
                    type="button"
                    className="cursor-pointer text-(--primary) underline-offset-2 hover:underline"
                    onClick={changeToAuth}
                >
                    Увійти
                </button>
            </div>
        </form>
    );
}
