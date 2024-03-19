"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, FC } from "react";
import { LoginPage } from "./login/LoginPage";
export default function MainPage() {
  return (
    <>
      <LoginPage />
    </>
  );
}
