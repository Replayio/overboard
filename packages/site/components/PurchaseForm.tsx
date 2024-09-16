import { useCallback, useState } from "react";
import { AddToCartButton, colorways } from "@replayio/overboard";
import { Colors, Color } from "./Colors";

import { Column } from "./Column";

export function PurchaseForm({
  data,
  onDataChange,
}: {
  data: any;
  onDataChange: (id: string, payload: any) => void;
}) {
  const [hasError, setHasError] = useState(false);
  const handleSubmit = useCallback(async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const formData = Object.fromEntries(data.entries());
    const body = JSON.stringify(formData);
    const response = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      setHasError(true);
      throw new Error(errorMessage);
    }

    alert("Thanks for your purchase! 🎉");
  }, []);

  return (
    <Column
      as="form"
      action="/api/purchase"
      method="post"
      onSubmit={handleSubmit}
      gap={3}
      style={{ placeItems: "center" }}
    >
      <Column gap={2}>
        <Colors onColorChange={color => onDataChange("color", color)}>
          {Object.entries(colorways).map(([name, [start, end]]) => (
            <Color
              key={name}
              label={name}
              value={name.toLowerCase()}
              checked={name === data.color}
              startColor={start}
              endColor={end}
            />
          ))}
        </Colors>
      </Column>

      <AddToCartButton hasError={hasError} />
    </Column>
  );
}
