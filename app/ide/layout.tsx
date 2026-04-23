import { ModeSwitcher } from "@/components/shared/ModeSwitcher";

export const metadata = {
  title: "Dhairya Patel - IDE",
};

export default function IDELayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModeSwitcher />
      {children}
    </>
  );
}
