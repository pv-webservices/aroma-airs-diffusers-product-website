import { Star } from "lucide-react";
import { SectionHeading } from "./ui";
export type Testimonial = {
  review: string;
  name: string;
  designation: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
};
// Add only client-approved, genuine reviews. The section remains hidden until then.
export const approvedTestimonials: Testimonial[] = [];
export default function Testimonials() {
  if (!approvedTestimonials.length) return null;
  return (
    <section className="section testimonial-section">
      <div className="container">
        <SectionHeading
          label="IN THEIR WORDS"
          title="What our customers say."
          centered
        />
        <div
          className="testimonial-grid"
          tabIndex={0}
          aria-label="Customer reviews"
        >
          <>
            {approvedTestimonials.map((review, index) => (
              <figure className="testimonial-card" key={index}>
                <div
                  className="review-stars"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={17}
                      fill={i < review.rating ? "currentColor" : "none"}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote>{review.review}</blockquote>
                <figcaption>
                  <strong>{review.name}</strong>
                  <span>{review.designation}</span>
                  <span>{review.location}</span>
                </figcaption>
              </figure>
            ))}
          </>
        </div>
      </div>
    </section>
  );
}
