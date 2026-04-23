import { ModeSwitcher } from "@/components/shared/ModeSwitcher";

export const metadata = {
  title: "Dhairya Patel - Terminal",
};

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModeSwitcher />
      {children}
    </>
  );
}
