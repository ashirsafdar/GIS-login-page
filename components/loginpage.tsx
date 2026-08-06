"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Dither from "./Dither";
import ARGISLOGO from "@/public/ARGIS LOGO.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "ashir-niazi14",
    password: "12345678",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {
      username: "",
      password: "",
    };

    let valid = true;

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log(form);
    alert("Login Successful");
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden  p-4">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black [&_canvas]:pointer-events-none">
        <div
          className="absolute inset-0 z-0 bg-black/20 backdrop-blur-[1px]"
          style={{ backgroundImage: "url('/bg-pattern.jpg')" }}
        />
        <div className="absolute inset-0 z-10 ">
          <Dither
            className="h-full w-full"
            waveColor={[0.14901960784313725, 0.45098039215686275, 0.35294117647058826]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.18}
            colorNum={4}
            pixelSize={4}
            waveAmplitude={0.45}
            waveFrequency={2.8}
            waveSpeed={0.06}
          />
        </div>
      </div>

      <div className="relative z-10 w-[92%] max-w-[640px] mx-auto my-auto rounded-[24px] border border-white/10 p-10 shadow-2xl backdrop-blur-md bg-[#0c0d0e]">
        <div className="mb-10 flex justify-center">
          <Image src={ARGISLOGO} width={280} height={280} alt="Logo" priority     unoptimized
              className="h-auto w-full max-w-[240px] object-contain bg-[#0c0d0e]"/>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="text-[20px] pb-5 font-lg text-slate-300">Username</label>
            <div className="flex h-16 items-center rounded-xl border border-[#272b34] bg-[#111214] px-5 transition-all focus-within:border-blue-500">
              <User size={21} className="text-[#7e8799]" />
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                className="ml-4 h-full w-full bg-transparent text-lg text-white placeholder:text-[#6d7179] outline-none"
              />
            </div>
            {errors.username && <p className="mt-2 text-sm text-red-500">{errors.username}</p>}
          </div>

          <div>
            <label className="text-[20px] pb-5 font-lg text-slate-300">Password</label>
            <div className="flex h-16 items-center rounded-xl border border-[#272b34] bg-[#111214] px-5 transition-all focus-within:border-blue-500">
              <Lock size={21} className="text-[#7e8799]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="ml-4 h-full w-full bg-transparent text-lg text-white placeholder:text-[#6d7179] outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#7382a0]">
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
          </div>

<Link href="/UI">
            <button className="mt-3 h-14 w-full rounded-xl bg-[#3466db] text-xl font-semibold text-white transition duration-300 hover:bg-[#2957c4] active:scale-[0.99]">
              Sign in
            </button>
          </Link>
          
        </form>
      </div>
      
    </main>
  );
}