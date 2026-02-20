import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/todoService";
import { useAuth } from "../context/useAuth";
import { Mail, Lock, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await AuthService.login(email, password);
            if (data.token) {
                login(data.token, data.user);
                navigate("/");
            } else {
                setError(data.message || "Login failed");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputCls = "w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none transition-all focus:border-green-500 focus:ring-4 focus:ring-green-100 text-slate-800 placeholder-slate-400";

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="text-3xl font-black bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent tracking-widest">TODOER</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">Welcome back</h2>
                <p className="text-slate-500 text-sm text-center mb-8">Sign in to continue organizing your tasks</p>

                {error && (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl px-4 py-3 text-sm mb-6">
                        <AlertCircle size={15} className="shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="login-email" className="text-sm font-semibold text-slate-700">Email</label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vedant@gmail.com" required className={inputCls} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="login-password" className="text-sm font-semibold text-slate-700">Password</label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password123" required className={inputCls} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-r from-green-600 to-teal-600 text-white font-semibold text-sm shadow-lg shadow-green-200 hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                        {loading ? "Signing in…" : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-600 font-semibold hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
