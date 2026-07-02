import { ServicesGrid } from "@/components/services/ServicesGrid";

/** Homepage solutions grid section (glass flip cards). */
export function HomeServicesSection() {
  return (
    <div id="solutions">
      <ServicesGrid
        surface="glass"
        badge="Solutions"
        heading="AI Data Center Solution"
        subheading="Empowering enterprises with AI Data Center Solutions designed to deliver performance, reliability, and scalability across every stage of the infrastructure lifecycle."
        ctaHref="/solutions"
        ctaLabel="View all solutions"
      />
    </div>
  );
}
