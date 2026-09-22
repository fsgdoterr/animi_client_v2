import Block from "@/components/ui/block";
import AuthForm from "@/components/ui/public/modals/auth/auth-form";
import ForgotForm from "@/components/ui/public/modals/auth/forgot-form";
import RegisterForm from "@/components/ui/public/modals/auth/register-form";
import Modal from "@/components/ui/shared/modal";
import { X } from "lucide-react";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    close: () => void;
}

type AuthFormType = "auth" | "register" | "forgot";

const FORM_TITLES: Record<AuthFormType, string> = {
    auth: "Авторизація",
    register: "Реєстрація",
    forgot: "Відновлення пароля",
};

export default function AuthModal({ isOpen, close }: Props) {
    const [currentForm, setCurrentForm] = useState<AuthFormType>("auth");

    const handleClose = () => {
        setCurrentForm("auth");
        close();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            className="w-full max-w-[390px]"
        >
            <Block className="border-white/[0.08] p-4 shadow-[0_28px_90px_rgba(0,0,0,.58)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-[17px] font-medium text-white/90">
                        {FORM_TITLES[currentForm]}
                    </h2>

                    <button
                        type="button"
                        className="grid size-8 cursor-pointer place-items-center rounded-lg text-white/55 transition hover:bg-white/7 hover:text-white"
                        aria-label="Закрити"
                        onClick={handleClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                {currentForm === "auth" && (
                    <AuthForm
                        changeToForgot={() => setCurrentForm("forgot")}
                        changeToRegister={() => setCurrentForm("register")}
                    />
                )}

                {currentForm === "register" && (
                    <RegisterForm changeToAuth={() => setCurrentForm("auth")} />
                )}

                {currentForm === "forgot" && (
                    <ForgotForm changeToAuth={() => setCurrentForm("auth")} />
                )}
            </Block>
        </Modal>
    );
}
