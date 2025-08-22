import { useEffect } from "react";

export default function useFadeInAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-up");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
