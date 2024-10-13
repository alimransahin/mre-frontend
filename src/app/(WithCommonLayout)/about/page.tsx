import { Facebook, Instagram } from "lucide-react";

import { TwitterIcon } from "@/src/components/icons";

const teamMembers = [
  {
    name: "Mr. Imran",
    title: "Founder & CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1508243529287-e21914733111?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
    description:
      "With over 10 years of experience in software development, Mr. Imran leads the vision and strategy for MRA, ensuring that our goals align with the needs of our users.",
  },
  {
    name: "Mr. Rakib",
    title: "CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1495603889488-42d1d66e5523?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Mr. Rakib is responsible for the technical direction of MRA, overseeing the development team and ensuring that our platform remains cutting-edge and secure.",
  },
  {
    name: "Mr. Pavel",
    title: "Product Manager",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661326220954-82fc15e69dff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Focused on user experience, Mr. Pavel oversees the development of features that enhance usability and engagement, ensuring our app meets user expectations.",
  },
  {
    name: "Mr. Roni",
    title: "Marketing Director",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Mr. Roni drives our outreach efforts, helping to connect MRA with users and partners who share our vision of improved communication.",
  },
  {
    name: "Mr. Habib",
    title: "Community Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1568585105565-e372998a195d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Mr. Habib is dedicated to fostering our community, engaging with users to gather feedback and promote meaningful interactions on our platform.",
  },
];
const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome to MRA!</h2>
        <p className="mb-2">
          At MRA, we are dedicated to revolutionizing the way users connect and
          share information in the digital age. Our app provides a platform for
          meaningful interactions, fostering community and collaboration among
          users.
        </p>
        <p>
          In a world where communication can often feel fragmented, MRA aims to
          create a seamless experience that brings people together. Whether
          it`&apos;`s connecting with friends, engaging with communities, or
          sharing valuable insights, our platform is designed to enhance the way
          you interact online.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-2">
          Our mission is to empower individuals and organizations through
          technology, enabling seamless communication and collaboration while
          prioritizing user privacy and data security.
        </p>
        <p>
          We believe that technology should enhance human connections rather
          than replace them. Our goal is to provide tools that allow users to
          express themselves, share their experiences, and build lasting
          relationships in a secure environment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="mb-2">
          We envision a world where technology bridges gaps, creating a more
          connected and informed society. Our vision is to be at the forefront
          of digital communication, transforming how people engage with one
          another and with the information around them.
        </p>
        <p>
          As we look to the future, we aim to continue innovating and expanding
          our services to meet the evolving needs of our users. By staying ahead
          of industry trends and listening to our community, we aspire to lead
          in providing impactful solutions that enhance digital communication.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
        <p className="mb-2">
          Our team is composed of passionate individuals who bring diverse
          skills and experiences to MRA. We work collaboratively to ensure that
          our platform is user-friendly, innovative, and responsive to the needs
          of our community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-default-100 shadow-lg rounded-lg p-4 text-center"
            >
              <img
                alt={member.name}
                className="w-full h-48 object-cover rounded-t-lg"
                src={member.imageUrl}
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <h4 className="text-default-600">{member.title}</h4>
              <p className="mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-2">
          We would love to hear from you! For any inquiries, feedback, or
          suggestions, please reach out to us through the following channels:
        </p>
        <p>
          Email:{" "}
          <a className="text-blue-600" href="mailto:support@mraapp.com">
            support@mraapp.com
          </a>
        </p>
        <p>Phone: (123) 456-7890</p>
        <p>Follow us on social media for updates:</p>
        <ul className=" flex">
          <li>
            <a className="text-blue-600" href="https://twitter.com/mraapp">
              <TwitterIcon size={36} />
            </a>
          </li>
          <li>
            <a className="text-blue-600" href="https://facebook.com/mraapp">
              <Facebook size={36} />
            </a>
          </li>
          <li>
            <a className="text-blue-600" href="https://instagram.com/mraapp">
              <Instagram size={36} />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
