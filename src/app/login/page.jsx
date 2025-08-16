'use client';
import { signIn } from "next-auth/react";
import LoginForm from "../components/LoginForm";


export default function LoginPage() {
    return (

        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl ">
                <LoginForm></LoginForm>
            </div>
        </div>


    );
}


        {/* <div className="p-6 max-w-sm mx-auto">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <button
                onClick={() => signIn("google")}
                className="bg-red-500 text-white px-4 py-2 w-full mb-2"
            >
                Sign in with Google
            </button>


        </div> */}