import Image from "next/image";
import { SectionHeading } from "./ui";

const clients = [
  "Manyavar", "BIG Language Solutions", "Client emblem supplied by Aroma Airs",
  "Max Healthcare", "Twamev", "Tanishq", "Skymark One", "Hexagon",
  "Marengo Asia Hospitals", "Central Park",
];

export default function Clients() {
  return (
    <section className="section clients-section" aria-labelledby="clients-heading">
      <div className="container">
        <div id="clients-heading">
          <SectionHeading
            label="OUR CLIENTS"
            title={<>In <em>beautiful</em> company.</>}
            description="Bringing a considered fragrance experience to the places our clients work, welcome and inspire."
          />
        </div>
        <ul className="client-logos" aria-label="Aroma Airs clients">
          {clients.map((client, i) => (
            <li key={client}>
              <Image src={`/images/client-logo-${i + 1}.webp`} alt={client} width={240} height={140} sizes="(max-width: 600px) 40vw, (max-width: 1000px) 25vw, 18vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
