import Button from "@/components/ui/shared/buttons/button";
import { FieldErrorMessage, RequestErrorMessage } from "@/components/ui/shared/form-error";
import TextInput from "@/components/ui/shared/inputs/text-input";
import { getErrorMessage } from "@/lib/helpers/get-error-message";
import {
    useConfirmPasswordResetMutation,
    useRequestPasswordResetMutation,
} from "@/lib/store/animi/auth-enpoints";
import { KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    changeToAuth: () => void;
}

interface ForgotFormData {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}

type ForgotStep = "request" | "confirm" | "success";

export default function ForgotForm({ changeToAuth }: Props) {
    const [requestedEmail, setRequestedEmail] = useState("");
    const [step, setStep] = useState<ForgotStep>("request");
    const [requestReset, requestState] = useRequestPasswordResetMutation();
    const [confirmReset, confirmState] = useConfirmPasswordResetMutation();

    const {
        register,
        handleSubmit,
        getValues,
        clearErrors,
        resetField,
        formState: { errors },
    } = useForm<ForgotFormData>({
        mode: "onTouched",
    });

    const submit: SubmitHandler<ForgotFormData> = async ({
        email,
        code,
        password,
    }) => {
        try {
            if (step === "request") {
                const normalizedEmail = email.trim();

                await requestReset({ email: normalizedEmail }).unwrap();

                setRequestedEmail(normalizedEmail);
                confirmState.reset();
                resetField("code");
                resetField("password");
                resetField("confirmPassword");
                setStep("confirm");
                return;
            }

            if (step === "confirm") {
                await confirmReset({
                    email: requestedEmail,
                    code: code.trim(),
                    password,
                }).unwrap();

                setStep("success");
            }
        } catch {
            // RTK Query stores request errors in the corresponding mutation state.
        }
    };

    const returnToRequestStep = () => {
        confirmState.reset();
        clearErrors(["code", "password", "confirmPassword"]);
        resetField("code");
        resetField("password");
        resetField("confirmPassword");
        setStep("request");
    };

    return (
        <form className="space-y-2.5" onSubmit={handleSubmit(submit)} noValidate>
            {step === "request" && (
                <>
                    {requestState.error && (
                        <RequestErrorMessage>
                            {getErrorMessage(requestState.error)}
                        </RequestErrorMessage>
                    )}

                    <p className="pb-1 text-[13px] leading-5 text-white/42">
                        Введіть пошту акаунта. Ми надішлемо шестизначний код для
                        зміни пароля.
                    </p>

                    <div>
                        <TextInput
                            placeholder="Пошта"
                            icon={<Mail size={20} />}
                            type="email"
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                                errors.email ? "forgot-email-error" : undefined
                            }
                            {...register("email", {
                                required: "Поле пошти є обов'язковим",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Невалідна пошта",
                                },
                            })}
                        />
                        <FieldErrorMessage
                            id="forgot-email-error"
                            message={errors.email?.message}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-1 w-full"
                        variant="green"
                        loading={requestState.isLoading}
                    >
                        Надіслати код
                    </Button>

                    <button
                        type="button"
                        className="h-9 w-full cursor-pointer text-[13px] text-white/38 transition hover:text-white/65"
                        onClick={changeToAuth}
                    >
                        Назад до входу
                    </button>
                </>
            )}

            {step === "confirm" && (
                <>
                    <p className="pb-1 text-[13px] leading-5 text-white/42">
                        Код надіслано на{" "}
                        <span className="text-white/72">{requestedEmail}</span>.
                        Введіть його та задайте новий пароль.
                    </p>

                    {confirmState.error && (
                        <RequestErrorMessage>
                            {getErrorMessage(confirmState.error)}
                        </RequestErrorMessage>
                    )}

                    <div>
                        <TextInput
                            placeholder="Код з листа"
                            icon={<KeyRound size={20} />}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            aria-invalid={Boolean(errors.code)}
                            aria-describedby={
                                errors.code ? "forgot-code-error" : undefined
                            }
                            {...register("code", {
                                required: "Введіть код",
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: "Код має містити 6 цифр",
                                },
                            })}
                        />
                        <FieldErrorMessage
                            id="forgot-code-error"
                            message={errors.code?.message}
                        />
                    </div>

                    <div>
                        <TextInput
                            placeholder="Новий пароль"
                            icon={<KeyRound size={20} />}
                            type="password"
                            autoComplete="new-password"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                                errors.password
                                    ? "forgot-password-error"
                                    : undefined
                            }
                            {...register("password", {
                                required: "Введіть новий пароль",
                                minLength: {
                                    value: 6,
                                    message: "Мінімум 6 символів",
                                },
                                maxLength: {
                                    value: 40,
                                    message: "Максимум 40 символів",
                                },
                            })}
                        />
                        <FieldErrorMessage
                            id="forgot-password-error"
                            message={errors.password?.message}
                        />
                    </div>

                    <div>
                        <TextInput
                            placeholder="Повторіть новий пароль"
                            autoComplete="new-password"
                            icon={<KeyRound size={20} />}
                            type="password"
                            aria-invalid={Boolean(errors.confirmPassword)}
                            aria-describedby={
                                errors.confirmPassword
                                    ? "forgot-confirm-password-error"
                                    : undefined
                            }
                            {...register("confirmPassword", {
                                required: "Повторіть новий пароль",
                                validate: (value) =>
                                    value === getValues("password") ||
                                    "Паролі не співпадають",
                                deps: ["password"],
                            })}
                        />
                        <FieldErrorMessage
                            id="forgot-confirm-password-error"
                            message={errors.confirmPassword?.message}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-1 w-full"
                        loading={confirmState.isLoading}
                    >
                        Змінити пароль
                    </Button>

                    <button
                        type="button"
                        onClick={returnToRequestStep}
                        className="h-9 w-full cursor-pointer text-[13px] text-white/38 transition hover:text-white/65"
                    >
                        Надіслати код повторно
                    </button>
                </>
            )}

            {step === "success" && (
                <>
                    <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-3 text-[13px] leading-5 text-emerald-200/85">
                        Пароль успішно змінено. Тепер можна увійти з новим
                        паролем.
                    </div>

                    <Button
                        type="button"
                        className="mt-1 w-full"
                        variant="green"
                        onClick={changeToAuth}
                    >
                        Повернутися до входу
                    </Button>
                </>
            )}
        </form>
    );
}
