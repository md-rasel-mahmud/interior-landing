export default function ContactSection() {
  return (
    <section className="bg-primary text-background py-24 relative flex flex-col md:flex-row items-start overflow-hidden">
      {/* Vertical CONTACT US text */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <h2 className="text-3xl font-semibold tracking-widest [writing-mode:vertical-rl] rotate-180">
          CONTACT&nbsp;US
        </h2>
      </div>

      {/* Main Content */}
      <div className="ml-16 md:ml-24 flex-1 grid gap-8 md:grid-cols-2 text-sm md:text-base">
        {/* Email */}
        <div>
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="opacity-90">info@themodern-arch.com</p>
        </div>

        {/* Phone */}
        <div>
          <h3 className="font-semibold mb-1">Phone</h3>
          <p className="opacity-90">2208 86 67</p>
          <p className="opacity-90">5000 61 51</p>
        </div>

        {/* Address */}
        <div className="">
          <h3 className="font-semibold mb-1">Address</h3>
          <p className="opacity-90">
            Salmiya | Plot 4 | Salem Al-Mubarak Street | Al-Sahab Tower | 4th
            Floor
          </p>
        </div>

        {/* Find Us */}
        <div className="">
          <h3 className="font-semibold mb-1">Find Us</h3>
          <p className="opacity-90">
            Instagram – <span className="underline">@platonic.kw</span>
          </p>
        </div>
      </div>
    </section>
  );
}
