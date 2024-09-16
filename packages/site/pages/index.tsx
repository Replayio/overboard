import * as React from "react";
import dynamic from "next/dynamic";
import { Background, Colorway, Features, Logo } from "@replayio/overboard";
import { Column, PlaceHolderWrapper, PurchaseForm } from "components";

const Hoverboard = dynamic(async () => (await import("@replayio/overboard")).Hoverboard, {
  ssr: false,
});

export default function Product() {
  const [formData, setFormData] = React.useState<{ color: Colorway }>({
    color: "red",
  });
  const handleDataChange = (id, value) => {
    setFormData(currentFormData => ({
      ...currentFormData,
      [id]: value,
    }));
  };

  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        paddingTop: "var(--space-3)",
        paddingBottom: "var(--space-2",
        gap: "var(--space-2)",
      }}
    >
      <Column gap={1}>
        <h1 className="screen-reader-only">Overboard</h1>
        <h2 className="screen-reader-only">Bugslayer</h2>
        <Logo />

        <Features />
      </Column>

      <div className="ProductAnimation">
        <PlaceHolderWrapper>
          <Hoverboard color={formData.color} />
        </PlaceHolderWrapper>
      </div>

      <Background />

      <PurchaseForm data={formData} onDataChange={handleDataChange} />
    </main>
  );
}
