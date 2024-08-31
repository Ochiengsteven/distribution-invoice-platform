"use client";

import Header from "@/components/Header";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";

const attrArr = [
  "Invoice management",
  "Payment Integration",
  "Driver Management",
  "P2P Market Trade",
];

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <Header />
      <div className="flex flex-col md:flex-row w-[600px] lg:w-[1100px] self-center text-center">
        <p className="text-indigo-950 text-8xl">*</p>
        <h1 className="text-2xl md:text-5xl xl:text-7xl font-black uppercase mx-auto text-indigo-950">
          Effortless invoice management from warehouse to customer
        </h1>
        <p className="text-indigo-950 text-8xl md:self-end">*</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 self-center">
        {attrArr.map((att) => (
          <div
            key={att}
            className="flex item-center gap-3 text-indigo-950 font-semibold"
          >
            <CheckCircleOutlined className="text-2xl" />
            {att}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-6 gap-4">
        <Image src="/home-dip.png" alt="hero-image" width={560} height={300} />
        <div className="bg-indigo-950 px-6 py-4 flex gap-4 rounded-full md:absolute md:right-[-20px] md:rotate-[-20deg] font-bold">
          <p className="text-white">Have questions?</p>
        </div>
        <div className="bg-indigo-950 px-12 py-4 flex rounded-full md:absolute md:left-[-40px] font-bold md:bottom-12">
          <p className="text-white">Your #1 Invoice Management Buddy!</p>
        </div>
      </div>
      <p className="text-sm text-center text-gray-700 w-[500px] self-center">
        Effortlessly manage invoices across your warehouse and customer network,
        ensuring accurate, timely, and organized financial transactions every
        time.
      </p>
      <Button
        type="primary"
        size="large"
        href="/signup"
        className="bg-indigo-950  rounded-full hover:bg-indigo-800 self-center text-xl animate-bounce"
      >
        Get Started
      </Button>
    </main>
  );
}
