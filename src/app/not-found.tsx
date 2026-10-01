import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>A LITTLE OFF THE SCENT</Eyebrow>
      <span className="not-found-number">404</span>
      <h1>This space hasn’t been created yet.</h1>
      <p>Let’s get you back to the collection.</p>
      <div>
        <Button href="/">Back to Home</Button>
        <Button href="/products" variant="outline">
          Explore Products
        </Button>
      </div>
    </section>
  );
}
