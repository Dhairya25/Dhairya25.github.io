import { ModeSwitcher } from "@/components/shared/ModeSwitcher";

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ModeSwitcher />
      {children}
    </>
  );
}
