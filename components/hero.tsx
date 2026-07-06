"use client";

import { ChevronRight as ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const headlineText = "The Zama Wrappers Registry, Productized";

export function Hero(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const opacityRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => requestAnimationFrame(() => {});
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldRender(true);
      },
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(headline);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targetOpacity = isVisible ? 1 : 0;

    const animate = () => {
      const diff = targetOpacity - opacityRef.current;
      const step = diff * 0.02;

      if (Math.abs(diff) > 0.001) {
        opacityRef.current += step;
        setOpacity(opacityRef.current);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        opacityRef.current = targetOpacity;
        setOpacity(targetOpacity);
        if (targetOpacity === 0) setShouldRender(false);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col items-center justify-start overflow-hidden px-6 pt-40 sm:pt-82"
    >

      <div ref={headlineRef} className="relative z-10 mx-auto md:text-center">
        <h1 className="mb-8 text-5xl font-medium tracking-tighter md:text-8xl lg:text-8xl">
          {headlineText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.4,
                delay: index * 0.03,
                ease: "easeOut",
              }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-muted-foreground mx-auto mt-6 max-w-xl text-2xl leading-12 tracking-tight md:text-3xl"
        >
          Explore, shield, and unshield{" "}
          <span className="text-foreground bg-foreground/5 inline-block rounded-md px-2 py-0.5 leading-10">confidential ERC-7984</span>{" "}
          tokens on the Zama Protocol. FHE-powered privacy for public blockchains.
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 pb-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <h2 className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl lg:text-6xl">
          Shield, Unshield, and Decrypt <br />
          Confidential Tokens on Sepolia
        </h2>
        <motion.a
          href="/dashboard"
          className="bg-accent group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-md py-3 pl-5 pr-3 font-medium text-black shadow-lg shadow-accent/25 transition-all duration-500 ease-out hover:rounded-[50px] hover:shadow-xl hover:shadow-accent/40 sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
        >
          <span>Launch App</span>
          <span className="bg-background text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
            <ChevronRightIcon className="relative left-px h-4 w-4" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
