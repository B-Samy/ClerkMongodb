import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
  <>

      <div className="hero-container">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-tagline">Made by ISMILE, for Developers</p>
          <h1 className="hero-title">
            Quality resources shared by the community
          </h1>
          <p className="hero-subtitle">
        Our mission is to empower businesses through innovative solutions, exceptional service, and a relentless focus on quality</p>

          <div className="hero-button-container">
            <Link href="/contact" className="hero-button">
              Get access to 4,958 resources
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <Image
          width={1200}
          height={400}
            className="hero-image"
            src="https://d33wubrfki0l68.cloudfront.net/54780decfb9574945bc873b582cdc6156144a2ba/d9fa1/images/hero/4/illustration.png"
            alt="Hero illustration"
          />
        </div>
      </section>
    </div>
  </>
  );
}
