type JsonLdProps = {
  data: object;
};

/* Renders a JSON-LD block. "<" is escaped so user-provided strings can never
   close the script tag. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
