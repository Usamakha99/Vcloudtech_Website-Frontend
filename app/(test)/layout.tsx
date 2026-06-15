import { poppins } from "@/lib/fonts/poppins";

export default function TestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`test-lab-root ${poppins.variable} font-sans min-h-full antialiased`}
    >
      {children}
    </div>
  );
}
